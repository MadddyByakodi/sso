/* eslint no-console: 0*/
const gulp = require('gulp');
const del = require('del');
const runSequence = require('run-sequence');
const plugin = require('gulp-load-plugins')();

gulp.task('develop', function develop() {
  plugin.nodemon({
    script: 'app.js',
    ext: 'js',

    // tasks: plugin.livereload.changed,
    ignore: ['node_modules/**', 'bower_components/**', 'src/**', 'dist/**'],
    nodeArgs: ['--debug'],
    env: {NODE_ENV: 'development' },
  });
});

// Jade Templates
gulp.task('html', function html() {
  return gulp.src('src/jade/**/*.jade')
    .pipe(plugin.changed('dist/html', {extension: '.html'}))
    .pipe(
      plugin.jade({
        pretty: true,
      })
      .on('error', plugin.notify.onError({
        message: 'Jade Error: <%= error.message %>',
      }))
    )
    .pipe(gulp.dest('dist/html'))
    .pipe(plugin.notify({
      onLast: true,
      title: 'Jade Compilation',
      message: 'all jade files compiled',
    }));
});

// Images
gulp.task('images', function images() {
  return gulp.src('src/images/**/*')
    .pipe(plugin.changed('dist/images', {extension: '.svg'}))
    .pipe(plugin.cache(plugin.imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/images'))
    .pipe(plugin.notify({
      onLast: true,
      title: 'Image Minification',
      message: 'Image minification done!',
    }));
});

// Styles
gulp.task('styles', function styles() {
  return gulp.src('src/styles/main.scss')
    .pipe(plugin.sourcemaps.init())
    .pipe(plugin.sass().on('error', plugin.sass.logError))
    .pipe(plugin.autoprefixer('last 2 version'))
    .pipe(plugin.sourcemaps.write('.'))
    .pipe(gulp.dest('dist/styles'))
    .pipe(plugin.rename({ suffix: '.min' }))
    .pipe(plugin.sourcemaps.write('.'))
    .pipe(gulp.dest('dist/styles'))
    .pipe(plugin.notify({
      onLast: true,
      title: 'SASS Compilation',
      message: 'style build complete',
    }));
});

// Scripts
gulp.task('scripts', function scripts() {
  return gulp.src('src/scripts/**/*.js')
    .pipe(plugin.sourcemaps.init())
    .pipe(plugin.concat('app.js'))
    .pipe(plugin.babel({
      presets: ['es2015'],
    }))
    .on('error', plugin.notify.onError({
      message: 'Babel Error: <%= error.message %>',
    }))
    .pipe(plugin.sourcemaps.write('.'))
    .pipe(gulp.dest('dist/scripts'))
    .pipe(plugin.rename({ suffix: '.min' }))
    .pipe(plugin.sourcemaps.write('.'))
    .pipe(gulp.dest('dist/scripts'))
    .pipe(plugin.notify({
      onLast: true,
      title: 'Scripts Compilation',
      message: 'script build completed',
    }));
});

// Scripts
gulp.task('lint', function lint() {
  return gulp.src(['app/**/*.js', '*.js', 'src/scripts/**/*.js'])
    .pipe(plugin.eslint())
    .pipe(plugin.eslint.format())
    .pipe(plugin.jscs())
    .pipe(plugin.jscs.reporter())
    .pipe(plugin.notify({
      onLast: true,
      title: 'Lint Notification',
      message: 'code linting for error completed',
    }));
});

// Clean
gulp.task('clean', function clean() {
  return del(['dist/styles', 'dist/scripts', 'dist/html', 'dist/images']);
});

// Watch
gulp.task('watch', function watch() {
  // Watch .jade files
  gulp.watch('src/jade/**/*.jade', ['html']);

  // Watch image files
  gulp.watch('src/images/**/*', ['images']);

  // Watch .scss files
  gulp.watch('src/styles/**/*.scss', ['styles']);

  // Watch frontend .js files
  gulp.watch('src/scripts/**/*.js', ['scripts']);

  // Watch node server files
  gulp.watch(['app/**/*.js', '*.js', 'src/scripts/**/*.js'], ['lint']);

  // Create LiveReload server
  plugin.livereload.listen();

  // Watch any files in dist/, reload on change
  gulp.watch('dist/**').on('change', plugin.livereload.changed);
});

gulp.task('build:dev', function buildSeq(cb) {
  runSequence('lint', 'clean', ['styles', 'scripts', 'images'], 'html', cb);
});

gulp.task('default', function dev(cb) {
  runSequence('develop', 'build:dev', 'watch', cb);
});
