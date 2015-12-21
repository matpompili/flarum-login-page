var flarum = require('flarum-gulp');

flarum({
  modules: {
    'matpompili/login-page': [
      'src/**/*.js'
    ]
  }
});
