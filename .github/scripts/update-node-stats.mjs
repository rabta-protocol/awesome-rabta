import {readFile, writeFile} from 'node:fs/promises';
import {publicNodes} from './nodes.mjs';

const README_URL = new URL('../../README.md', import.meta.url);
const START = '<!-- node-stats:start -->';
const END = '<!-- node-stats:end -->';
const TIMEOUT_MS = 15_000;
const USER_AGENT = 'awesome-rabta-stats/1.0 (+https://github.com/rabta-protocol/awesome-rabta)';

async function getJson(url) {
	const response = await fetch(url, {
		headers: {'user-agent': USER_AGENT},
		signal: AbortSignal.timeout(TIMEOUT_MS),
	});

	if (!response.ok) {
		throw new Error(`HTTP ${response.status}`);
	}

	return response.json();
}

function formatBytes(bytes) {
	if (!Number.isFinite(bytes)) {
		return '—';
	}

	if (bytes < 1024) {
		return `${bytes} B`;
	}

	const units = ['KB', 'MB', 'GB', 'TB'];
	let value = bytes;

	for (const unit of units) {
		value /= 1024;
		if (value < 1024) {
			const digits = value >= 10 ? 0 : 1;
			return `${value.toFixed(digits)} ${unit}`;
		}
	}

	return `${value.toFixed(0)} PB`;
}

function formatUptime(seconds) {
	if (!Number.isFinite(seconds)) {
		return '—';
	}

	const days = Math.floor(seconds / 86_400);
	const hours = Math.floor((seconds % 86_400) / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);

	if (days > 0) {
		return `${days}d ${hours}h`;
	}

	if (hours > 0) {
		return `${hours}h ${minutes}m`;
	}

	return `${minutes}m`;
}

function renderTable(rows) {
	const headers = ['Node', 'Status', 'Events', 'Blobs', 'Storage', 'Uptime', 'Stats'];
	const matrix = [headers, ...rows];
	const widths = headers.map((_, index) => Math.max(...matrix.map(row => row[index].length)));
	const line = row => `| ${row.map((cell, index) => cell.padEnd(widths[index])).join(' | ')} |`;
	const divider = `| ${widths.map(width => '-'.repeat(width)).join(' | ')} |`;

	return [line(headers), divider, ...rows.map(line)].join('\n');
}

async function loadNode(node) {
	const result = {node, health: null, stats: null, error: ''};

	try {
		result.health = await getJson(`${node.url}/api/v1/health`);
	} catch (error) {
		result.error = error.name === 'TimeoutError' ? 'timeout' : error.message;
		return result;
	}

	try {
		result.stats = await getJson(`${node.url}/api/v1/stats`);
	} catch {}

	return result;
}

function toRow({node, health, stats}) {
	const live = health?.status === 'ok';
	const events = health?.live_events ?? '—';
	const blobs = health?.live_blobs ?? '—';
	const storage = stats ? formatBytes(stats.storage?.used_bytes) : '—';
	const uptime = stats ? formatUptime(stats.uptime_s) : '—';

	return [
		node.name,
		live ? 'live' : 'offline',
		String(events),
		String(blobs),
		storage,
		uptime,
		`[stats](${node.url}/api/v1/stats)`,
	];
}

const results = await Promise.all(publicNodes.map(node => loadNode(node)));
const rows = results.map(result => toRow(result));
const checked = `${new Date().toISOString().slice(0, 16).replace('T', ' ')} UTC`;

const offline = results
	.filter(result => !result.health)
	.map(result => `${result.node.name} (${result.error})`);

const parts = [
	`Last checked **${checked}** by the weekly stats workflow. Badges stay live between runs.`,
	'',
	renderTable(rows),
];

if (offline.length > 0) {
	parts.push('', `Offline at this check: ${offline.join(', ')}.`);
}

const block = parts.join('\n');

const readme = await readFile(README_URL, 'utf8');
const startIndex = readme.indexOf(START);
const endIndex = readme.indexOf(END, startIndex);

if (startIndex === -1 || endIndex === -1) {
	throw new Error(`README is missing ${START} / ${END} markers`);
}

const next = `${readme.slice(0, startIndex + START.length)}\n${block}\n${readme.slice(endIndex)}`;

if (next === readme) {
	console.log('Node stats unchanged.');
} else {
	await writeFile(README_URL, next);
	console.log(`Updated node stats at ${checked}.`);
}

console.log(block);
