import gulp from 'gulp';
import watch from 'gulp-watch';
import server from 'gulp-connect';
import run from 'run-sequence';

import webpack from 'webpack';
import { development, production, migrator } from './webpack.config.babel'; // <-- Contains ES6+

const paths = {
  src: './src/**/*',
  widgets: './widgets/**/*',
  migrator: './migrator/**/*',
  dist: './dist'
};

gulp.task('default', (callback) => {
  run("server", "watch", callback);
});

gulp.task('dev', (callback) => {
  run("watch", callback);
});

gulp.task('build.magic', (callback) => {

  let bundler = webpack(development);

  bundler.run(callback);

});

gulp.task('build.migrator', (callback) => {

  let bundler = webpack(migrator);

  bundler.run(callback);

});

gulp.task('deploy', (callback) => {

  let bundler = webpack(production);

  bundler.run(callback);

});

gulp.task('watch', () => {
  return Promise.all([
    watch([ paths.src, paths.widgets ], () => {
      gulp.start('build.magic');
    }),
    watch([ paths.migrator ], () => {
      gulp.start('build.migrator');
    }),
  ])
});

gulp.task('server', () => {
  server.server({
    port: 3000
  });
});
