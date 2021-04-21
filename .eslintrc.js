module.exports = {
    env: {
      browser: true,
      node: true,
      es6: true,
    },
    parserOptions: {
      project: './tsconfig.json',
      ecmaFeatures: {
        jsx: true,
      },
    },
    plugins: ['@ionic'],
    extends: ['plugin:@ionic/recommended'], // or use `plugin:@ionic/strict`
    rules: {
      // additional rule configuration
      "linebreak-style": ["error", process.env.NODE_ENV === 'prod' ? "unix" : "windows"]
    }
  };