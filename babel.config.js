module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        alias: {
          '~assets': './src/assets',
          '~axios-instance': './src/axios-instance',
          '~components': './src/components',
          '~navigation': './src/navigation',
          '~screens': './src/screens',
          '~constants': './src/constants',
          '~themes': './src/themes',
          '~hooks': './src/hooks',
          '~redux': './src/redux',
          '~modules': './src/modules',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
