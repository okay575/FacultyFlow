module.exports = function(api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'react' }]
    ],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
          alias: {
            '@': './',
            '@/components': './components',
            '@/screens': './screens',
            '@/repositories': './repositories',
            '@/services': './services',
            '@/types': './types',
            '@/utils': './utils',
            '@/app': './app',
          },
        },
      ],
      // Required for Expo Router
      'expo-router/babel',
    ],
  };
};


