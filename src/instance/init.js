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


    // lifecycle state
    this._isCompiled  = false

    this._data = options.data || {}

    this._initScope();

}
