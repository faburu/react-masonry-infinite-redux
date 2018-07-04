import { StaticRouter } from 'react-router-dom';
import App from '../common/containers/App';
import { Provider } from 'react-redux';
import React from 'react';
import configureStore from '../common/store/configureStore';
import express from 'express';
// import qs from 'qs';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import serialize from 'serialize-javascript';
import axios from 'axios'; // could use Feathers client
import defaultState from '../common/defaultState';
import api from '../common/api';
const ReactCC = require("react-component-caching");
const cache = new ReactCC.ComponentCache();
const debug = require('debug')('SSR');
const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);
const server = express();
const sheet = new ServerStyleSheet();

// In the (static) components where you would like to enable caching, add a `cache` prop;
// <FancyStaticStuff cache />

server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  // can remove /api section if not testing
  .get('/*', async (req, res) => {
    debug('request params', req.params);

    // turn http://localhost:3000/animal/goat into ['animal', 'goat']
    const routeParams = req.params[0].split('/');

    // [] get data depending on route
    let data = await api();

    // Compile an initial state
    const initialStore = {
      ...defaultState,
      initialRouteParams: routeParams,
      ...data
    };

    // Create a new Redux store instance
    const store = configureStore(initialStore);

    // will be filled with stuff
    let context = {};

    // Create the server side style sheet
    const sheet = new ServerStyleSheet();

    // Render the component to a string - with caching
    const markup = await ReactCC.renderToString(
      <Provider store={store}>
        <StaticRouter context={context} location={req.url}>
          <App />
        </StaticRouter>
      </Provider>,
      cache
    );

    // get css from markup to be placed in initial html
    sheet.collectStyles(markup)

    // Generate all the style tags so they can be rendered into the page
    const styleTags = sheet.getStyleTags();

    // Grab the initial state from our Redux store
    const finalState = store.getState();

    if (context.url) {
      res.redirect(302, context.url);
    } else {
      res.send(`<!doctype html>
          <html lang="">
          <head>
              <meta http-equiv="X-UA-Compatible" content="IE=edge" />
              <meta charSet='utf-8' />
              <title>${defaultState.headers.title}</title>
              <meta name="viewport" content="width=device-width, initial-scale=1">
              ${assets.client.css
          ? `<link rel="stylesheet" href="${assets.client.css}">`
          : ''}
                ${process.env.NODE_ENV === 'production'
          ? `<script src="${assets.client.js}" defer></script>`
          : `<script src="${assets.client.js}" defer crossorigin></script>`}
          ${styleTags}
          </head>
          <body>
              <div id="root">${markup}</div>
              <script>
                window.__PRELOADED_STATE__ = ${serialize(finalState)}
              </script>
          </body>
      </html>`);
    }

  }); // end get

export default server;
