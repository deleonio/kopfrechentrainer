module.exports = {
  swDest: 'sw.js',
  cleanupOutdatedCaches: true,
  runtimeCaching: [
    {
      urlPattern: /\.html$/,
      handler: 'NetworkFirst',
    },
    {
      urlPattern: /\.(css|gif|gz|jpg|js|png|json)$/,
      handler: 'StaleWhileRevalidate',
    },
  ],
  skipWaiting: true,
  clientsClaim: true,
};
