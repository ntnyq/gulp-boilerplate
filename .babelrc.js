// See docs at https://github.com/babel/babel

module.exports = {
  presets: [
    ['@babel/env', {
      modules: false,
      useBuiltIns: false
    }]
  ],
  plugins: []
};
