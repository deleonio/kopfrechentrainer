const path = require('path');
module.exports = {
  name: 'Kopfrechentrainer',
  short_name: 'Rechentrainer',
  description: '...',
  lang: 'de-DE',
  start_url: 'https://github.modevel.de/rechnen/',
  display: 'fullscreen',
  orientation: 'any',
  theme_color: '#ddd',
  background_color: '#ddd',
  filename: 'manifest.json',
  icons: [
    {
      src: path.resolve('public/assets/christmas.png'),
      sizes: [96, 128, 192, 256, 384, 512],
      purpose: 'any maskable',
    },
  ],
  crossorigin: null,
  inject: true,
  fingerprints: false,
  ios: false,
  publicPath: null,
  includeDirectory: true,
};
