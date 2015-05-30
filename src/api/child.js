var _ = require('../util')

/**
 * Create a child instance that prototypally inehrits
 * data on parent. To achieve that we create an intermediate
 * constructor with its prototype pointing to parent.
 *
 * @param {Object} opts
 * @param {Function} [BaseCtor]
 * @return {Rebirth}
 * @public
 */

exports.$addChild = function (opts, BaseCtor) {
  BaseCtor = BaseCtor || _.Rebirth
  opts = opts || {}
  var parent = this
  var ChildRebirth
  var inherit = opts.inherit !== undefined
    ? opts.inherit
    : BaseCtor.options.inherit
  if (inherit) {
    var ctors = parent._childCtors
    ChildRebirth = ctors[BaseCtor.cid]
    if (!ChildRebirth) {
      var optionName = BaseCtor.options.name
      var className = optionName
        ? _.classify(optionName)
        : 'RebirthComponent'
      ChildRebirth = new Function(
        'return function ' + className + ' (options) {' +
        'this.constructor = ' + className + ';' +
        'this._init(options) }'
      )()
      ChildRebirth.options = BaseCtor.options
      ChildRebirth.prototype = this
      ctors[BaseCtor.cid] = ChildRebirth
    }
  } else {
    ChildRebirth = BaseCtor
  }
  opts._parent = parent
  opts._root = parent.$root
  var child = new ChildRebirth(opts)
  return child
}
