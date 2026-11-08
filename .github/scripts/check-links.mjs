import {readFile} from 'node:fs/promises';
import {publicNodes} from './nodes.mjs';

const FILES = ['README.md', 'CONTRIBUTING.md'];
const SKIPPED_HOSTS = new Set(['img.shields.io', 'shields.io', 'awesome.re']);
const USER_AGENT = 'awesome-rabta-link-check/1.0 (+https://github.com/rabta-protocol/awesome-rabta)';
const TIMEOUT_MS = 20_000;
const ATTEMPTS = 3;

const sleep = milliseconds => new Promise(resolve => {
	setTimeout(resolve, milliseconds);
});

function extractLinks(markdown) {
	const links = new Set();
	const patterns = [
		/\[[^\]]*\]\((https?:\/\/[^)\s]+)\)/g,
		/(?:href|src)="(https?:\/\/[^"]+)"/g,
	];

	for (const pattern of patterns) {
		for (const match of markdown.matchAll(pattern)) {
			links.add(match[1]);
		}
	}

	return [...links].filter(url => !SKIPPED_HOSTS.has(new URL(url).hostname));
}

async function request(url) {
	const response = await fetch(url, {
		redirect: 'follow',
		headers: {
			'user-agent': USER_AGENT,
			accept: 'text/html,application/xhtml+xml,application/json;q=0.9,*/*;q=0.8',
		},
		signal: AbortSignal.timeout(TIMEOUT_MS),
	});

	await response.body?.cancel();
	return response.status;
}

async function checkUrl(url) {
	let reason = 'unknown error';

	for (let attempt = 1; attempt <= ATTEMPTS; attempt++) {
		try {
			const status = await request(url);

			if (status >= 200 && status < 400) {
				return {ok: true, detail: `HTTP ${status}`};
			}

			if ([401, 403, 405, 429].includes(status)) {
				return {ok: true, warning: true, detail: `HTTP ${status} (bot protection)`};
			}

			reason = `HTTP ${status}`;

			if ([404, 410].includes(status)) {
				break;
			}
		} catch (error) {
			reason = error.name === 'TimeoutError' ? 'timeout' : error.message;
		}

		if (attempt < ATTEMPTS) {
			await sleep(1500 * attempt);
		}
	}

	return {ok: false, detail: reason};
}

async function checkNode(node) {
	try {
		const response = await fetch(`${node.url}/api/v1/health`, {
			headers: {'user-agent': USER_AGENT},
			signal: AbortSignal.timeout(TIMEOUT_MS),
		});

		if (!response.ok) {
			return {ok: false, detail: `HTTP ${response.status}`};
		}

		const body = await response.json();

		if (body.status !== 'ok') {
			return {ok: false, detail: `status is ${JSON.stringify(body.status)}`};
		}

		const blobLabel = body.live_blobs === 1 ? 'blob' : 'blobs';
		return {ok: true, detail: `${body.live_events} events, ${body.live_blobs} ${blobLabel}`};
	} catch (error) {
		return {ok: false, detail: error.name === 'TimeoutError' ? 'timeout' : error.message};
	}
}

const markdown = (await Promise.all(FILES.map(async file => readFile(file, 'utf8')))).join('\n');
const links = extractLinks(markdown);

const [linkResults, nodeResults] = await Promise.all([
	Promise.all(links.map(async url => ({url, ...await checkUrl(url)}))),
	Promise.all(publicNodes.map(async node => ({node, ...await checkNode(node)}))),
]);

const failures = linkResults.filter(result => !result.ok);
const warnings = linkResults.filter(result => result.warning);
const nodeFailures = nodeResults.filter(result => !result.ok);

const lines = [
	'# Link check report',
	'',
	`Checked ${links.length} links in ${FILES.join(' and ')} and ${publicNodes.length} public nodes.`,
	'',
	'## Public nodes',
	'',
	...nodeResults.map(result => `- ${result.ok ? 'OK' : 'FAIL'} \`${result.node.url}\` — ${result.detail}`),
	'',
	'## Links',
	'',
	`- ${linkResults.length - failures.length - warnings.length} healthy`,
	`- ${warnings.length} warnings`,
	`- ${failures.length} failures`,
];

if (warnings.length > 0) {
	lines.push('', '### Warnings', '', ...warnings.map(result => `- \`${result.url}\` — ${result.detail}`));
}

if (failures.length > 0) {
	lines.push('', '### Failures', '', ...failures.map(result => `- \`${result.url}\` — ${result.detail}`));
}

if (nodeFailures.length > 0) {
	lines.push('', '### Unhealthy nodes', '', ...nodeFailures.map(result => `- \`${result.node.url}\` — ${result.detail}`));
}

console.log(lines.join('\n'));

if (failures.length > 0 || nodeFailures.length > 0) {
	process.exitCode = 1;
}
