var _ = require('./util')
var extend = _.extend

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
 * Rebirth and every constructor that extends Rebirth has an
 * associated options object, which can be accessed during
 * compilation steps as `this.constructor.options`.
 *
 * These can be seen as the default options of every
 * Rebirth instance.
 */

Rebirth.options = {
  directives  : require('./directives'),
  components  : {},
  elementDirectives: {}
}

/**
 * Build up the prototype
 */

var p = Rebirth.prototype


/**
 * Mixin internal instance methods
 */

extend(p, require('./instance/init'))
extend(p, require('./instance/events'))
extend(p, require('./instance/scope'))
extend(p, require('./instance/compile'))

/**
 * Mixin public API methods
 */

extend(p, require('./api/events'))
extend(p, require('./api/lifecycle'))

module.exports = _.Rebirth = Rebirth
