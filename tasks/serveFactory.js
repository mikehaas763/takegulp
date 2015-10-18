import watch from 'gulp-watch';
import browserSync from 'browser-sync';
import TaskName from '../TaskName.js';

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