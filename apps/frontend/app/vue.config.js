module.exports = {
  devServer: {
      proxy: {
        '/api/*': {
          target: 'http://api:3000',
          secure: false,
        },
      },
      watchOptions: {
          ignored: /node_modules/,
          poll: true
      },
      disableHostCheck: true
  },
};
