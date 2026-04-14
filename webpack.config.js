module.exports = require('@leanup/stack-preact/webpack.config');

module.exports = (env, argv) => {
  const config = require('@leanup/stack-preact/webpack.config')(env, argv);

  const path = require('path');
  const WebpackPwaManifest = require('webpack-pwa-manifest');
  const webpack = require('webpack');
  const pwaManifestConfigPath = path.resolve(process.cwd(), 'pwa-manifest.config.js');
  const { GenerateSW } = require('workbox-webpack-plugin');
  const workboxConfigPath = path.resolve(process.cwd(), 'workbox-config.js');
  const commitSha = process.env.GITHUB_SHA || process.env.CI_COMMIT_SHA || 'dev';

  config.plugins.push(new WebpackPwaManifest(require(pwaManifestConfigPath)));
  config.plugins.push(new GenerateSW(require(workboxConfigPath)));
  config.plugins.push(
    new webpack.DefinePlugin({
      __COMMIT_SHA__: JSON.stringify(commitSha),
    })
  );

  return config;
};
