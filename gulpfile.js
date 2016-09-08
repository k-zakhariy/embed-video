var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var scriptsPathMask = 'src/js/**/*.js';
var dist = 'dist/';
var config = {
    production: !!plugins.util.env.production,
    sourceMaps: !plugins.util.env.production,
};

gulp.task('scripts', function () {
    return gulp.src([scriptsPathMask])
        .pipe(plugins.plumber())
        .pipe(plugins.if(config.sourceMaps, plugins.sourcemaps.init()))
        .pipe(plugins.concat('app.js'))
        .pipe(config.production ? plugins.uglify() : plugins.util.noop())
        .pipe(plugins.if(config.sourceMaps, plugins.sourcemaps.write('.')))
        .pipe(gulp.dest(dist));
});
gulp.task('watch', function () {
    gulp.watch(scriptsPathMask, ['scripts']);
});
gulp.task('default', ['scripts']);
