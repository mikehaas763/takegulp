'use strict';

var combine = require('stream-combiner2');
var del = require('del');
var vinylPaths = require('vinyl-paths');

module.exports = cleanPipe;
// Using del with vinylPaths like this allows us to del files that the consumer si
function cleanPipe(config) {
    return combine(vinylPaths(del));
}
