var _ = require('./util'),
	extend = _.extend;

/**
 * The exposed Vue constructor.
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
 * Mixin global API
 */



/**
 * Build up the prototype
 */

var p = Rebirth.prototype

/**
 * Mixin internal instance methods
 */

extend(p, require('./instance/init'))



module.exports = Rebirth
