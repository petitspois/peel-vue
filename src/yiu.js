var _ = require('./util');

/**
 * The exposed Yiu constructor.
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

function Yiu (options) {
  this._init(options)
}

/**
 * Build up the prototype
 */

var p = Yiu.prototype


/**
 * Yiu and every constructor that extends Yiu has an
 * associated options object, which can be accessed during
 * compilation steps as `this.constructor.options`.
 *
 * These can be seen as the default options of every
 * Yiu instance.
 */

Yiu.options = {
  directives  : require('./directives')
}

/**
 * Mixin internal instance methods
 */

_.extend(p, require('./instance/init.js'));
_.extend(p, require('./instance/scope.js'));
_.extend(p, require('./instance/compile'))


/**
 * Mixin public API methods
 */

_.extend(p, require('./api/lifecycle'))


module.exports = _.Yiu = Yiu
