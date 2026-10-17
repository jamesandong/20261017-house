import { Hono } from 'hono';
import html from '../index.html';

const app = new Hono();
app.use('*', async (c, next) => {
  await next();
  c.header('X-Content-Type-Options', 'nosniff');
  c.header('Referrer-Policy', 'strict-origin-when-cross-origin');
  c.header('Content-Security-Policy', "default-src 'none'; style-src 'unsafe-inline'; script-src 'unsafe-inline'; img-src 'self' data:; base-uri 'none'; frame-ancestors 'none'; form-action 'none'");
});
app.get('/', c => c.html(html));
app.get('/index.html', c => c.html(html));
app.notFound(c => c.text('Not found', 404));
export default app;
