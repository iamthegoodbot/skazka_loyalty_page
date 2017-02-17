import gulp from 'gulp';
import watch from 'gulp-watch';
import server from 'gulp-connect';
import run from 'run-sequence';

import fs from 'fs';
import replace from 'replace-in-file';

import webpack from 'webpack';
import { development, production, migrator, config } from './webpack.config.babel'; // <-- Contains ES6+

const PACKAGE = JSON.parse(fs.readFileSync('package.json', 'utf8'));

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

gulp.task('build.settings', (callback) => {
   
   let bundler = webpack(config);
 
   bundler.run(callback)
 
});

gulp.task('build.magic', (callback) => {

  let bundler = webpack(development);

  bundler.run(callback);

});

gulp.task('build.migrator', (callback) => {

  let bundler = webpack(migrator);

  bundler.run(callback);

});

gulp.task('watch', () => {
  return Promise.all([
    watch([ './config/**/*' ], () => {
       gulp.start('build.settings');
    }),
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

//deploying section
gulp.task('deploy.version', () => {

  console.log(`Deploying version: ${PACKAGE.version}`);

  replace({
    files: paths.dist + '/**/*',
    replace: /\$\{MAGIC_VERSION\}/g,
    with: PACKAGE.version
  });

});

gulp.task('deploy.magic', (callback) => {

  let bundler = webpack(production);

  bundler.run(callback);

});

gulp.task('deploy.migrator', (callback) => {

  let bundler = webpack(migrator);

  bundler.run(callback);

});

gulp.task('deploy', (callback) => {

  run('deploy.magic', 'deploy.migrator', 'deploy.version', callback);

});
