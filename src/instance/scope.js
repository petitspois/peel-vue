var _ = require('../util')

var Observer = require('../observer')

/**
 * Setup the scope of an instance, which contains:
 * - observed data
 * - computed properties
 * - user methods
 * - meta properties
 */

exports._initScope = function() {
    this._initData()
}

exports._initData = function() {
    var data = this._data
    var i, key
    var keys = Object.keys(data)
    i = keys.length
    while (i--) {
        key = keys[i]
        if (!_.isReserved(key)) {
            this._proxy(key)
        }
    }
    Observer.create(data).addVm(this)
}

exports._proxy = function(key){
    var self = this
    Object.defineProperty(self, key, {
        configurable:true,
        enumerable:true,
        get : function(){
            return self._data[key]
        },
        set : function(val){
            self._data[key] = val
        }
    })
}
