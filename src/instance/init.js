var mergeOptions = require('../util/merge-option')
/**
 * The main init sequence. This is called for every
 * instance, including ones that are created from extended
 * constructors.
 *
 * @param {Object} options - this options object should be
 *                           the result of merging class
 *                           options and the options passed
 *                           in to the constructor.
 */


exports._init = function(options){

    this.$el = null

    this._watcherList  = [] // all watchers as an array

    this._directives   = [] // all directives

    this._watchers     = {} // internal watchers as a hash

    // lifecycle state
    this._isCompiled  = false

    // merge options.
    options = this.$options = mergeOptions(
      this.constructor.options,
      options,
      this
    )

    this._data = options.data || {}

    this._initScope();

}
