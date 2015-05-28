var lang = require('./lang'),
	extend = lang.extend;

extend(exports, lang);
extend(exports, require('./env'));
extend(exports, require('./dom'));
extend(exports, require('./debug'));
extend(exports, require('./filter'));
