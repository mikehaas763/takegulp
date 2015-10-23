'use strict';

var lazypipe = require('lazypipe');
// try the below functionality with stream-combiner1 or re-try to see why there was issues with that method and jsfilter
//var combine = require('stream-combiner2');
var babel = require('gulp-babel');
var gulpFilter = require('gulp-filter');

module.exports = babelPipe;
function babelPipe(config) {
    var jsFilter = gulpFilter(['**/*.js'], {restore: true});

    var pipe = lazypipe()
        .pipe(function() {
            return jsFilter;
        })
        .pipe(babel, config.babelOptions)
        .pipe(function() {
            return jsFilter.restore;
        });

    return pipe()
        .on('error', function(e) {
            console.log('>>> ERROR', e);
            // emit here
            this.emit('end');
        });
}
