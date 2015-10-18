import gulp from 'gulp';
import buildFactory from './tasks/buildFactory.js';
import cleanFactory from './tasks/cleanFactory.js';
import {serveFactory, privateBuildReload} from './tasks/serveFactory.js';
import TaskName from './TaskName.js';

var config = {
    buildOutputLocation: 'out',
    nodeModulesLocation: 'node_modules',
    watchTree: ['App/**/*', 'ClientRelations/**/*', 'Adapters/**/*', 'BamBam/**/*', 'index.html', 'loaderConfig.js'],
    sourceTree: ['GulpEvent.js', 'ClientRelations/**/*', 'Adapters/**/*', 'BamBam/**/*'],
    browserSyncConfig: {
        open: false,
        server: {
            baseDir: './'
        }
    },
    babelOptions: {
        modules: 'system'
    }
};


gulp.task(TaskName.Default, [TaskName.Serve]);
gulp.task(TaskName.Build, [TaskName.Clean], () => {
    return buildFactory(config, gulp)();
});
gulp.task(TaskName.Clean, () => {
    return cleanFactory(config)();
});
gulp.task(TaskName.Serve, [TaskName.Build], () => {
    return serveFactory(config, gulp);
});
gulp.task(TaskName.PrivateBuildReload, [TaskName.Build], privateBuildReload);
