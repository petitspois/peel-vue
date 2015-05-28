var structure＝ null,
	delimiters = ['{{', '}}'];

structure = {

	/**
	 * The prefix to look for when parsing directives.
	 *
	 * @type {String}
	 */

	preifx: 'rb-'

	/**
	 * Whether to print debug messages.
	 * Also enables stack trace for warnings.
	 *
	 * @type {Boolean}
	 */

	debug: false,

	/**
	 * Whether to suppress warnings.
	 *
	 * @type {Boolean}
	 */

	silent: false,

	/**
	 * Internal flag to indicate the delimiters have been changed.
	 *
	 * @type {Boolean}
	 */

	_delimitersChanged: true

}

Object.defineProperty(structure, 'delimiters', {
	get: function() {
		return delimiters;
	},
	set: function(newValue) {
		delimiters = newValue;
		this._delimitersChanged = true;
	}
});

module.exports = structure;
