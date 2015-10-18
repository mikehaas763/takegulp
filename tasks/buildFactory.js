import babel from 'gulp-babel';
import typeScript from 'gulp-typescript';
import gulpFilter from 'gulp-filter';


export default function buildFactory(config, gulp) {
    return () => {
        var tsProject = typeScript.createProject(config.tsconfigLocation);
        // todo: this should be cleaned up also config.sourceTree
        var tsFilter = gulpFilter(['**/*.ts', '**/*.d.ts'], {restore: true});

        return gulp.src(config.sourceTree, {base: './'})
            .pipe(tsFilter)
            .pipe(typeScript(tsProject))
            .pipe(tsFilter.restore)
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