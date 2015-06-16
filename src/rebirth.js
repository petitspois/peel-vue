var _ = require('./util');

/**
 * The exposed Rebirth constructor.
 *
 * API conventions:
 * - public API methods/properties are prefiexed with `$`
 * - internal methods/properties are prefixed with `_`
 * - non-prefixed properties are assumed to be proxied user
 *   data.
 *
 * @constructor
 * @param {Object} [options]
 * @public
 */

function Rebirth (options) {
  this._init(options)
}

/**
 * Build up the prototype
 */

var p = Rebirth.prototype


/**
 * Mixin internal instance methods
 */

_.extend(p, require('./instance/init.js'));
_.extend(p, require('./instance/scope.js'));

module.exports = _.Rebirth = Rebirth
