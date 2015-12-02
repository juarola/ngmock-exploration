// enables gulp
// var gulp = require('gulp');
var gulp = require('gulp-help')(require('gulp'));


// autoloading gulp-plugins, removed the need
// for separate requires. use $.nameOfThePluginWithoutGulpDash
var $ = require('gulp-load-plugins')({
    lazy: true
});

// gulp.task('help', function () {
// 
// });
// 
// gulp.task('default', ['help']);
