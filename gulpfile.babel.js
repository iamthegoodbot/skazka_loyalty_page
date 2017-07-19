import gulp from 'gulp';
import run from 'run-sequence';

import fs from 'fs';
import path from 'path';

import webpack from 'webpack';
import { development, production, migrator } from './webpack.config'; // <-- Contains ES6+

const PACKAGE = JSON.parse(fs.readFileSync('package.json', 'utf8'));

const paths = {
  src: './src/**/*',
  widgets: './widgets/**/*',
  migrator: './migrator/**/*',
  dist: './dist'
};

gulp.task('default', (callback) => {
  run("webpack-dev-server", callback);
});

gulp.task('build.magic', (callback) => {

  let bundler = webpack(development);

  bundler.run(callback);

});

gulp.task('build.migrator', (callback) => {

  let bundler = webpack(migrator);

  bundler.run(callback);

});

gulp.task('server', () => {
  const server = require('gulp-connect');
  server.server({
    port: 3000
  });
});

gulp.task("production-server", () => {
  run('deploy.magic', 'server');
})

gulp.task("webpack-dev-server", () => {
  const nodemon = require('gulp-nodemon')
  nodemon({
    script: 'server.js',
    watch: ['server.js', 'webpack.config.js']
  })
});

//deploying section

gulp.task('deploy.magic', (callback) => {

  let bundler = webpack(production);

  bundler.run(callback);

});

gulp.task('deploy.migrator', (callback) => {

  let bundler = webpack(migrator);

  bundler.run(callback);

});

gulp.task('deploy', (callback) => {

  run('deploy.magic', 'deploy.migrator', callback);

});