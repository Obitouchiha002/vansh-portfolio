import express from 'express';
import { createServer } from 'vite';
const app = express();
const vite = await createServer({
  server: { middlewareMode: true },
  appType: 'spa',
});
app.use(vite.middlewares);
app.listen(3001, () => {
    console.log("Ready");
    fetch('http://localhost:3001/').then(r => r.text()).then(t => console.log(t.substring(0, 100))).catch(console.error);
});
