var watch = require('gulp-watch');
var browserSync = require('browser-sync');
var TaskName = require('../TaskName.js');

var browserSyncServer = browserSync.create();

module.exports.serveFactory = serveFactory;
function serveFactory(config, gulp) {
    browserSyncServer.init(config.browserSyncConfig);
    watch(config.watchTree, function() {
        gulp.start(TaskName.PrivateBuildReload);
    });
}

module.exports.privateBuildReload = privateBuildReload;
function privateBuildReload() {
    browserSyncServer.reload();
}