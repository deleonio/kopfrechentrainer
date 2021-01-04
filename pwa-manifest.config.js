const path = require('path');
module.exports = {
  name: 'Kopfrechentrainer',
  short_name: 'Rechentrainer',
  description: '...',
  lang: 'de-DE',
  start_url: 'https://app.modevel.de/rechnen/',
  display: 'standalone',
  orientation: 'any',
  theme_color: '#e2313b',
  background_color: '#ffff',
  filename: 'manifest.json',
  icons: [
    {
      src: path.resolve('public/assets/christmas.png'),
      sizes: [96, 128, 192, 256, 384, 512],
    },
  ],
  crossorigin: null,
  inject: true,
  fingerprints: false,
  ios: false,
  publicPath: null,
  includeDirectory: true,
};
