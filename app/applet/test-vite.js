import { createServer } from 'vite';
const vite = await createServer({
  server: { middlewareMode: true },
  appType: 'spa',
});
vite.middlewares.handle({ url: '/', method: 'GET', headers: {} }, { setHeader: () => {}, end: console.log, statusCode: 200, on: () => {} }, (err) => console.log('next', err));
