import { enableProdMode } from '@angular/core';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { APP_BASE_HREF } from '@angular/common';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import AppServerModule from './src/main.server';

// Enable production mode
enableProdMode();

export function app(): express.Express {
  const server = express();
  
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  // Set the Universal engine for SSR
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule
  }));

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Serve static files from /browser
  server.get('*.*', express.static(browserDistFolder, {
    maxAge: '1y'
  }));

  // All regular routes use the Angular engine
  server.get('*', (req, res, next) => {
    const { protocol, originalUrl, headers, baseUrl } = req;
    
    res.render(indexHtml, {
      req,
      providers: [
        { provide: APP_BASE_HREF, useValue: baseUrl },
      ]
    }, (err, html) => {
      if (err) {
        return next(err);
      }
      res.send(html);
    });
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
  });
}

run();
