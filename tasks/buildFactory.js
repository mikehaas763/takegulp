import babel from 'gulp-babel';
import gulpFilter from 'gulp-filter';


export default function buildFactory(config, gulp) {
    return () => {
        var jsFilter = gulpFilter(['**/*.js'], {restore: true});

        return gulp.src(config.sourceTree, {base: './'})
            .pipe(jsFilter)
            .pipe(babel(config.babelOptions))
            .on('error', function(e) {
                console.log('>>> ERROR', e);
                // emit here
                this.emit('end');
            })
            .pipe(jsFilter.restore)
            .pipe(gulp.dest(config.buildOutputLocation));
    };
}