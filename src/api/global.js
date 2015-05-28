var _ = require('../util'),
	mergeOptions = require('../util/merge-option');

/**
 * Expose useful internals
 */

exports.util = _
exports.nextTick = _.nextTick
exports.config = require('../config')

exports.compiler = {
	conpile = require('../compiler/compile')
}
