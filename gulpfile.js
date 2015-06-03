var gulp = require('gulp');
var $ = require('gulp-load-plugins')({lazy: true});
var config = require('./gulp.config')();

gulp.task('hi', function() {
    console.log(config.app);
});

gulp.task('print', function(){
    gulp.src(config.app)
        .pipe($.print());
});

//woredeb os used to inject bower components
gulp.task('wiredep', function() {
    log('Wire up the bower css js and our app js into the html');
    var options = config.getWiredepDefaultOptions();
    var wiredep = require('wiredep').stream;

    return gulp
        .src(config.index)
        .pipe(wiredep(options))
        .pipe($.inject(gulp.src(config.js)))
        .pipe(gulp.dest(config.dest));
});

gulp.task('inject', ['wiredep'],  function() {
    log('Wire up the app css into the html, and call wiredep ');

    return gulp
        .src(config.index)
        .pipe($.inject(gulp.src(config.css)))
        .pipe(gulp.dest(config.dest));
});

function log(msg) {
    if (typeof (msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log(util.colors.blue(msg[item]));
            }
        }
    }else {
        $.util.log($.util.colors.blue(msg));
    }
}