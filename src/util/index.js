var lang = require('./lang'),
	extend = lang.extend;

extend(exports, lang);
extend(exports, require('./env'));
extend(exports, require('./dom'));
extend(exports, require('./debug'));
extend(exports, require('./filter'));

/**
 * Check if an element is a component, if yes return its
 * component id.
 *
 * @param {Element} el
 * @param {Object} options
 * @return {String|undefined}
 */

exports.checkComponent = function (el, options) {
  var tag = el.tagName.toLowerCase()
  if (options.components[tag]) {
    return tag
  }
  // dynamic syntax
  if (tag === 'component') {
    var exp = el.getAttribute('type')
    el.removeAttribute('type')
    return exp
  }
}
