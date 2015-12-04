/* eslint no-console: 0*/
const gulp = require('gulp');
const del = require('del');
const plugin = require('gulp-load-plugins')();

gulp.task('develop', function develop() {
  plugin.nodemon({
    script: 'app.js',
    ext: 'js',

    // tasks: plugin.livereload.changed,
    ignore: ['node_modules/**', 'bower_components/**', 'src/**'],
    nodeArgs: ['--debug'],
    env: {NODE_ENV: 'development' },
  });
});

// Jade Templates
gulp.task('html', function html() {
  return gulp.src('src/jade/**/*.jade')
    .pipe(
      plugin.jade({
        pretty: true,
      })
      .on('error', plugin.notify.onError({
        message: 'Jade Error: <%= error.message %>',
      }))
    )
    .pipe(gulp.dest('dist/html/'))
    .pipe(plugin.notify({ message: 'Jade Compilation complete' }));
});

// Images
gulp.task('images', function images() {
  return gulp.src('src/images/**/*')
    .pipe(plugin.cache(plugin.imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/images'))
    .pipe(plugin.notify({ message: 'Images task complete' }));
});

// Styles
gulp.task('styles', function styles() {
  return gulp.src('src/styles/main.scss')
    .pipe(plugin.sourcemaps.init())
    .pipe(plugin.sass().on('error', plugin.sass.logError))
    .pipe(plugin.autoprefixer('last 2 version'))
    .pipe(gulp.dest('dist/styles'))
    .pipe(plugin.rename({ suffix: '.min' }))
    .pipe(plugin.minifyCss())
    .pipe(plugin.sourcemaps.write('.'))
    .pipe(gulp.dest('dist/styles'))
    .pipe(plugin.notify({ message: 'Styles task complete' }));
});

// Scripts
gulp.task('scripts', function scripts() {
  return gulp.src('src/scripts/**/*.js')
    .pipe(plugin.eslint())
    .pipe(plugin.eslint.format())
    .pipe(plugin.jscs())
    .pipe(plugin.jscs.reporter())
    .pipe(plugin.sourcemaps.init())
    .pipe(plugin.concat('app.js'))
    .pipe(plugin.babel({
      presets: ['es2015'],
    }))
    .on('error', plugin.notify.onError({
      message: 'Babel Error: <%= error.message %>',
    }))
    .pipe(gulp.dest('dist/scripts'))
    .pipe(plugin.rename({ suffix: '.min' }))
    .pipe(plugin.uglify())
    .on('error', plugin.notify.onError({
      message: 'Uglify Error: <%= error.message %>',
    }))
    .pipe(plugin.sourcemaps.write('.'))
    .pipe(gulp.dest('dist/scripts'))
    .pipe(plugin.notify({ message: 'Scripts task complete' }));
});

// Scripts
gulp.task('lint', function lint() {
  return gulp.src(['app/**/*.js', '*.js'])
    .pipe(plugin.eslint())
    .pipe(plugin.eslint.format())
    .pipe(plugin.jscs())
    .pipe(plugin.jscs.reporter())
    .pipe(plugin.notify({ message: 'Lint server code task complete' }));
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
  gulp.watch(['app/**/*.js', '*.js'], ['lint']);

  // Create LiveReload server
  plugin.livereload.listen();

  // Watch any files in dist/, reload on change
  gulp.watch('dist/**').on('change', plugin.livereload.changed);
});

gulp.task('build:dev', ['html', 'styles', 'scripts', 'images']);
gulp.task('default', ['develop', 'build:dev', 'watch']);
