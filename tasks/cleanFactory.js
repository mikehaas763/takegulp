var del = require('del');

module.exports = cleanFactory;
function cleanFactory(config) {
    return () => {
        return del(config.buildOutputLocation);
    };
}
