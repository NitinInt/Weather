module.exports = {
  presets: ['@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@Weather': './src',
          '@e2e': './e2e',
        },
      },
    ],
    'module:react-native-dotenv',
  ],
};
