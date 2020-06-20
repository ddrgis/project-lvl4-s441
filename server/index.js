// @ts-check

import 'core-js/stable';
import 'regenerator-runtime/runtime';

import path from 'path';
import Pug from 'pug';
import socket from 'socket.io';
import fastify from 'fastify';
import pointOfView from 'point-of-view';
import fastifyStatic from 'fastify-static';
import fastifyFavicon from 'fastify-favicon';
import addRoutes from './routes';

const appPath = path.join(__dirname, '..');

const setUpViews = app => {
  app.register(pointOfView, {
    engine: {
      pug: Pug,
    },
    templates: path.join(__dirname, 'views'),
  });
};

const setUpStaticAssets = app => {
  app.register(fastifyStatic, {
    root: path.join(appPath, 'dist/public'),
    prefix: '/assets',
  });
  app.register(fastifyFavicon, { path: './assets' });
};

export default options => {
  const app = fastify();

  setUpViews(app);
  setUpStaticAssets(app);

  const io = socket(app.server);

  addRoutes(app, io, options.state || {});

  return app;
};
