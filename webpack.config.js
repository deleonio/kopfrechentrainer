module.exports = require('@leanup/stack-preact/webpack.config');

module.exports = (env, argv) => {
  const config = require('@leanup/stack-preact/webpack.config')(env, argv);

  const path = require('path');
  const WebpackPwaManifest = require('webpack-pwa-manifest');
  const pwaManifestConfigPath = path.resolve(process.cwd(), 'pwa-manifest.config.js');
  const { GenerateSW } = require('workbox-webpack-plugin');
  const workboxConfigPath = path.resolve(process.cwd(), 'workbox-config.js');

  config.plugins.push(new WebpackPwaManifest(require(pwaManifestConfigPath)));
  config.plugins.push(new GenerateSW(require(workboxConfigPath)));

  return config;
};
