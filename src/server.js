import express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import { StaticRouter } from 'react-router';

import { Provider } from 'react-redux';

import configureStore from './redux/configureStore';

import routes from './routes';
import App from './components/App'

const app = express();

app.use((req, res) => {

  const store = configureStore();
  // This is contet object contains the result of the render
  const context = {};
  const html = ReactDOM.renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>
    </Provider>
  );

  res.status(200).send(renderHTML(html));
});

const assetUrl = process.env.NODE_ENV !== 'production' ? 'http://localhost:8888' : '/';

function renderHTML(componentHTML) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Hello React</title>
      <link rel="stylesheet" href="${assetUrl}/public/assets/styles.css">
    </head>
    <body>
      <div id="react-view">${componentHTML}</div>
      <div id="dev-tools"></div>
      <script type="application/javascript" src="${assetUrl}/public/assets/bundle.js"></script>
    </body>
    </html>
  `;
}

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log('Server listening on: ', PORT);
});
