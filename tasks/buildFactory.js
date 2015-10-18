var babel = require('gulp-babel');
var typeScript = require('gulp-typescript');
var gulpFilter = require('gulp-filter');

module.exports = buildFactory;
function buildFactory(config, gulp) {
    return () => {
        var tsProject = typeScript.createProject(config.tsconfigLocation);
        // todo: this should be cleaned up also config.sourceTree
        var tsFilter = gulpFilter(['**/*.ts', '**/*.d.ts'], {restore: true});
        var jsFilter = gulpFilter(['**/*.js'], {restore: true});


        return gulp.src(config.sourceTree, {base: './'})
            .pipe(tsFilter)
            .pipe(typeScript(tsProject))
            .pipe(tsFilter.restore)
            .pipe(babel(config.babelOptions))
            .on('error', function(e) {
                console.log('>>> ERROR', e);
                // emit here
                this.emit('end');
            })
            .pipe(jsFilter.restore)
            .pipe(gulp.dest(config.buildOutputLocation));
    };

    //return () => {
    //    var jsFilter = gulpFilter(['**/*.js'], {restore: true});
    //
    //    return gulp.src(config.sourceTree, {base: './'})
    //        .pipe(jsFilter)
    //        .pipe(babel(config.babelOptions))
    //        .on('error', function(e) {
    //            console.log('>>> ERROR', e);
    //            // emit here
    //            this.emit('end');
    //        })
    //        .pipe(jsFilter.restore)
    //        .pipe(gulp.dest(config.buildOutputLocation));
    //};
}