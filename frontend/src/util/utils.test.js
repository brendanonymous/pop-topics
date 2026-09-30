import { test } from 'node:test';
import assert from 'node:assert/strict';
import { normalizeTrendVolume, parseTrendVolume } from './utils.js';

test('parses current Google Trends volume labels', () => {
  assert.equal(parseTrendVolume('2M+'), 2_000_000);
  assert.equal(parseTrendVolume('500K+'), 500_000);
  assert.equal(parseTrendVolume('1,000 searches'), 1_000);
});

test('scales bubbles by relative search volume', () => {
  assert.ok(normalizeTrendVolume('2M+') > normalizeTrendVolume('500K+'));
  assert.ok(Number.isFinite(normalizeTrendVolume('2M+')));
});

test('rejects missing or malformed volume labels', () => {
  assert.equal(parseTrendVolume(undefined), null);
  assert.equal(parseTrendVolume('not a volume'), null);
  assert.equal(normalizeTrendVolume(undefined), 60);
});
