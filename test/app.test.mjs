import { test } from 'node:test';
import assert from 'node:assert/strict';
import app from '../dist/worker.mjs';
test('profile routes preserve content, contact links and security headers', async () => {
  for (const path of ['/', '/index.html']) {
    const response = await app.fetch(new Request('https://example.com'+path));
    assert.equal(response.status,200);
    assert.match(response.headers.get('content-type'),/text\/html/);
    assert.equal(response.headers.get('x-content-type-options'),'nosniff');
    const html = await response.text();
    for (const text of ['양의조','서울대학교 의학박사','mailto:euecho53@gmail.com','tel:+821087556296']) assert.ok(html.includes(text));
  }
});
test('HEAD has no body and unknown routes return 404', async () => {
  const head = await app.fetch(new Request('https://example.com/',{method:'HEAD'}));
  assert.equal(head.status,200);
  assert.equal(await head.text(),'');
  assert.equal((await app.fetch(new Request('https://example.com/missing'))).status,404);
});
