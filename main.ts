// GTA 6 meme entry for make.fun's "Post a GTA 6 meme on X" bounty
// (gta6-meme-x-01). Node 22, standard library only, no network.
//
// The entry itself is the post on X: the house reads POST.json from this
// repository, fetches the post, and hands its first picture and its text to
// the judge. This program's only job is to hand POST.json over to the
// grader: it reads the file from the repository, checks that it really
// names an X post, and writes the same bytes to the output directory.
//
// Run it the way the grader does:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// An X post address, as X shows it: https://x.com/<handle>/status/<id>
// (twitter.com, with or without www./mobile., and /i/web/status/<id> also
// count; a query string or fragment after the id is ignored). The id is
// one or more digits: the placeholder POST.json this repository ships with
// carries id 0, which is not a real post (the house refuses it), but the
// program still copies it — whether the post is real is the gate's job,
// not this program's.
const POST_URL = /^https:\/\/(www\.|mobile\.)?(x\.com|twitter\.com)\/([A-Za-z0-9_]{1,15})\/(status|i\/web\/status)\/(\d{1,25})([?#].*)?$/;
const MAX_POST_JSON_BYTES = 16384;

function fail(message: string): never {
  console.error(`main.ts: ${message}`);
  process.exit(1);
}

mkdirSync(OUTPUT_DIR, { recursive: true });

const source = join(BOT_DIR, 'POST.json');
let raw: Buffer;
try {
  raw = readFileSync(source);
} catch (err) {
  fail(`could not read POST.json from ${BOT_DIR}: ${(err as Error).message}`);
}

if (raw.length > MAX_POST_JSON_BYTES) {
  fail(`POST.json is ${raw.length} bytes, over the ${MAX_POST_JSON_BYTES} byte limit`);
}

let post: unknown;
try {
  post = JSON.parse(raw.toString('utf8'));
} catch (err) {
  fail(`POST.json is not valid JSON: ${(err as Error).message}`);
}

if (typeof post !== 'object' || post === null || Array.isArray(post)) {
  fail('POST.json must be a JSON object with a url field');
}

const url = (post as { url?: unknown }).url;
if (typeof url !== 'string' || !POST_URL.test(url)) {
  fail('POST.json url must be an X post address like https://x.com/<handle>/status/<id>');
}

writeFileSync(join(OUTPUT_DIR, 'POST.json'), raw);
