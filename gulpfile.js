var gulp = require("gulp");
var browsersync = require("browser-sync");
var cp = require("child_process");
var plugins = require("gulp-load-plugins")({
  rename: {
    "gulp-autoprefixer": "prefix",
  }
});

var messages = {
  jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

gulp.task('jekyll-build', function (done) {
  plugins.browsersync.notify(messages.jekyllBuild);
  return cp.spawn('jekyll', ['build', '--drafts'], {stdio: 'inherit'})
  .on('close', done);
});

gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
  plugins.browsersync.reload();
});

gulp.task('browser-sync', ['sass', 'jekyll-build'], function() {
  plugins.browsersync({
    server: {
      baseDir: './_site'
    }
  });
});

gulp.task('sass', function () {
  return gulp.src('./_sass/main.scss')
  .pipe(plugins.sass({
    includePaths: ['./_sass'],
    outputStyle: 'compressed',
    onError: browsersync.notify
  }))
  .pipe(plugins.prefix(['last 2 versions'], { cascade: true }))
  .pipe(gulp.dest('./_site/assets/css'))
  .pipe(browsersync.reload({stream:true}))
  .pipe(gulp.dest('./assets/css'));
});

gulp.task('watch', function () {
  gulp.watch('./_sass/*.scss', ['sass']);
  gulp.watch(['./index.html', './_layouts/*', './_posts/*'], ['jekyll-rebuild']);
});

gulp.task('default', ['browser-sync', 'watch']);
