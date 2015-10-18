var watch = require('gulp-watch');
var browserSync = require('browser-sync');
var TaskName = require('../TaskName.js');

const browserSyncServer = browserSync.create();

export function serveFactory(config, gulp) {
    browserSyncServer.init(config.browserSyncConfig);
    watch(config.watchTree, function() {
        gulp.start(TaskName.PrivateBuildReload);
    });
}


export function privateBuildReload() {
    browserSyncServer.reload();
}