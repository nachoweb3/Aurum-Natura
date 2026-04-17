const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const siteRoot = path.join(__dirname, '..', 'site');
const port = Number(process.env.PORT || 4173);

const mime = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8'
};

http
  .createServer((request, response) => {
    const rawPath = decodeURIComponent((request.url || '/').split('?')[0]);
    const safePath = rawPath === '/' ? '/index.html' : rawPath;
    const filePath = path.normalize(path.join(siteRoot, safePath));

    if (!filePath.startsWith(siteRoot)) {
      response.writeHead(403);
      response.end('Forbidden');
      return;
    }

    const finalPath =
      fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()
        ? path.join(filePath, 'index.html')
        : filePath;

    fs.readFile(finalPath, (error, data) => {
      if (error) {
        response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        response.end('Not found');
        return;
      }

      const extension = path.extname(finalPath).toLowerCase();
      response.writeHead(200, {
        'Content-Type': mime[extension] ?? 'application/octet-stream',
        'Cache-Control': 'no-store'
      });
      response.end(data);
    });
  })
  .listen(port, () => {
    console.log(`Aurum Natura storefront available at http://127.0.0.1:${port}`);
  });
