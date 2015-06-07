var _ = require('../../util')

module.exports = {

    bind: function() {
        var self = this
        var el = this.el

        // handle composition events.
        // http://blog.evanyou.me/2014/01/03/composition-event/
        var cpLocked = false
        this.cpLock = function() {
            cpLocked = true
        }
        this.cpUnlock = function() {
            cpLocked = false
                // in IE11 the "compositionend" event fires AFTER
                // the "input" event, so the input handler is blocked
                // at the end... have to call it here.
            set()
        }
        _.on(el, 'compositionstart', this.cpLock)
        _.on(el, 'compositionend', this.cpUnlock)

        // shared setter
        function set() {
            var val = el.value
            self.set(val)
        }

        // if the directive has filters, we need to
        // record cursor position and restore it after updating
        // the input with the filtered value.
        // also force update for type="range" inputs to enable
        // "lock in range" (see #506)
        this.listener = function textInputListener() {
            if (cpLocked) return
            set()
        }

        this.event = 'input'
            // Support jQuery events, since jQuery.trigger() doesn't
            // trigger native events in some cases and some plugins
            // rely on $.trigger()
            //
            // We want to make sure if a listener is attached using
            // jQuery, it is also removed with jQuery, that's why
            // we do the check for each directive instance and
            // store that check result on itself. This also allows
            // easier test coverage control by unsetting the global
            // jQuery variable in tests.

        _.on(el, this.event, this.listener)

        // IE9 doesn't fire input event on backspace/del/cut
        if (_.isIE9) {
            this.onCut = function() {
                _.nextTick(self.listener)
            }
            this.onDel = function(e) {
                if (e.keyCode === 46 || e.keyCode === 8) {
                    self.listener()
                }
            }
            _.on(el, 'cut', this.onCut)
            _.on(el, 'keyup', this.onDel)
        }

        // set initial value if present
        if (
            el.hasAttribute('value') ||
            (el.tagName === 'TEXTAREA' && el.value.trim())
        ) {
            this._initValue = el.value
        }

    },

    update: function(value) {
        this.el.value = _.toString(value)
    },

    unbind: function() {
        var el = this.el
        if (this.hasjQuery) {
            jQuery(el).off(this.event, this.listener)
        } else {
            _.off(el, this.event, this.listener)
        }
        _.off(el, 'compositionstart', this.cpLock)
        _.off(el, 'compositionend', this.cpUnlock)
        if (this.onCut) {
            _.off(el, 'cut', this.onCut)
            _.off(el, 'keyup', this.onDel)
        }
    }

}
