import gulp from 'gulp';
import watch from 'gulp-watch';
import server from 'gulp-connect';
import run from 'run-sequence';

import webpack from 'webpack';
import webpack_config, { production } from './webpack.config.babel'; // <-- Contains ES6+

const paths = {
  src: './src/**/*',
  widgets: './widgets/**/*',
  migrator: './migrator/**/*',
  dist: './dist'
};

gulp.task('default', (callback) => {
  run("build", "server", "watch", callback);
});

gulp.task('dev', (callback) => {
  run("build", "watch", callback);
});

gulp.task('build', (callback) => {

  let bundler = webpack(webpack_config);

  bundler.run(callback);

});

gulp.task('deploy', (callback) => {

  let bundler = webpack(production);

  bundler.run(callback);

});

gulp.task('watch', () => {
  return watch([ paths.src, paths.widgets, paths.migrator ], () => {
    gulp.start('build');
  })
});

gulp.task('server', () => {
  server.server({
    port: 3000
  });
});
