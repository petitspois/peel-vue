var _ = require('../util')
var Dep = require('./dep')

var uid = 0

/**
 * Type enums
 */

var OBJECT = 1

/**
 * Observer class that are attached to each observed
 * object. Once attached, the observer converts target
 * object's property keys into getter/setters that
 * collect dependencies and dispatches updates.
 *
 * @param {Array|Object} value
 * @param {Number} type
 * @constructor
 */

function Observer(value, type) {
    this.id = ++uid
    this.value = value
    this.active = true
    this.deps = []
    _.define(value, '__ob__', this)
    if (type === OBJECT) {
        this.walk(value)
    }
}

Observer.target = null

var p = Observer.prototype

Observer.create = function(value) {
    if (
        _.isPlainObject(value)
    ) {
        return new Observer(value, OBJECT)
    }
}

p.walk = function(obj) {
    var keys = Object.keys(obj)
    var i = keys.length
    var key
    while (i--) {
        key = keys[i]
        this.convert(key, obj[key])
    }
}

/**
 * Convert a property into getter/setter so we can emit
 * the events when the property is accessed/changed.
 *
 * @param {String} key
 * @param {*} val
 */

p.convert = function (key, val) {
  var ob = this
  var childOb = ob.observe(val)
  var dep = new Dep()
  if (childOb) {
    childOb.deps.push(dep)
  }
  Object.defineProperty(ob.value, key, {
    enumerable: true,
    configurable: true,
    get: function () {
      // Observer.target is a watcher whose getter is
      // currently being evaluated.
      if (ob.active && Observer.target) {
        Observer.target.addDep(dep)
      }
      return val
    },
    set: function (newVal) {
      if (newVal === val) return
      // remove dep from old value
      var oldChildOb = val && val.__ob__
      if (oldChildOb) {
        oldChildOb.deps.$remove(dep)
      }
      val = newVal
      // add dep to new value
      var newChildOb = ob.observe(newVal)
      if (newChildOb) {
        newChildOb.deps.push(dep)
      }
      dep.notify()
    }
  })
}

/**
 * Try to carete an observer for a child value,
 * and if value is array, link dep to the array.
 *
 * @param {*} val
 * @return {Dep|undefined}
 */

p.observe = function (val) {
  return Observer.create(val)
}

/**
 * Add an owner vm, so that when $add/$delete mutations
 * happen we can notify owner vms to proxy the keys and
 * digest the watchers. This is only called when the object
 * is observed as an instance's root $data.
 *
 * @param {Yiu} vm
 */

p.addVm = function (vm) {
  (this.vms = this.vms || []).push(vm)
}

module.exports = Observer
