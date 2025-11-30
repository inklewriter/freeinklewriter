// Feature 10: Translation System
// Browser locale detection, jQuery.cookie, jQuery.tr plugin, and translation infrastructure

getFirstBrowserLocale = function () {
    var nav = window.navigator,
    browserLanguagePropertyKeys = ['language', 'browserLanguage', 'systemLanguage', 'userLanguage'],
    i,
    language;

    // support for HTML 5.1 "navigator.languages"
    if (Array.isArray(nav.languages)) {
      for (i = 0; i < nav.languages.length; i++) {
        language = nav.languages[i];
        if (language && language.length) {
          break;
        }
      }
    }

    // support for other well known properties in browsers
    for (i = 0; i < browserLanguagePropertyKeys.length; i++) {
      language = nav[browserLanguagePropertyKeys[i]];
      if (language && language.length) {
        break
      }
    }

    return typeof(language) === "string" ? language.toLowerCase() : "";

  };

  /*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		// CommonJS
		factory(require('jquery'));
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($) {

	var pluses = /\+/g;

	function encode(s) {
		return config.raw ? s : encodeURIComponent(s);
	}

	function decode(s) {
		return config.raw ? s : decodeURIComponent(s);
	}

	function stringifyCookieValue(value) {
		return encode(config.json ? JSON.stringify(value) : String(value));
	}

	function parseCookieValue(s) {
		if (s.indexOf('"') === 0) {
			// This is a quoted cookie as according to RFC2068, unescape...
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
		}

		try {
			// Replace server-side written pluses with spaces.
			// If we can't decode the cookie, ignore it, it's unusable.
			// If we can't parse the cookie, ignore it, it's unusable.
			s = decodeURIComponent(s.replace(pluses, ' '));
			return config.json ? JSON.parse(s) : s;
		} catch(e) {}
	}

	function read(s, converter) {
		var value = config.raw ? s : parseCookieValue(s);
		return $.isFunction(converter) ? converter(value) : value;
	}

	var config = $.cookie = function (key, value, options) {

		// Write

		if (value !== undefined && !$.isFunction(value)) {
			options = $.extend({}, config.defaults, options);

			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setTime(+t + days * 864e+5);
			}

			return (document.cookie = [
				encode(key), '=', stringifyCookieValue(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path    ? '; path=' + options.path : '',
				options.domain  ? '; domain=' + options.domain : '',
				options.secure  ? '; secure' : ''
			].join(''));
		}

		// Read

		var result = key ? undefined : {};

		// To prevent the for loop in the first place assign an empty array
		// in case there are no cookies at all. Also prevents odd result when
		// calling $.cookie().
		var cookies = document.cookie ? document.cookie.split('; ') : [];

		for (var i = 0, l = cookies.length; i < l; i++) {
			var parts = cookies[i].split('=');
			var name = decode(parts.shift());
			var cookie = parts.join('=');

			if (key && key === name) {
				// If second argument (value) is a function it's a converter...
				result = read(cookie, value);
				break;
			}

			// Prevent storing a cookie that we couldn't decode.
			if (!key && (cookie = read(cookie)) !== undefined) {
				result[name] = cookie;
			}
		}

		return result;
	};

	config.defaults = {};

	$.removeCookie = function (key, options) {
		if ($.cookie(key) === undefined) {
			return false;
		}

		// Must not alter options, thus extending a fresh object...
		$.cookie(key, '', $.extend({}, options, { expires: -1 }));
		return !$.cookie(key);
	};

}));

/**
 * @file jquery.tr.js
 * @brief Support for internationalization.
 * @author Jonathan Giroux (Bloutiouf)
 * @site https://github.com/Bloutiouf/jquery.tr
 * @version 1.1
 * @license MIT license <http://www.opensource.org/licenses/MIT>
 *
 * jquery.tr is a jQuery plugin which enables you to translate text on the
 * client side.
 *
 * Features:
 * - uses a predefined dictionary.
 * - translates into languages with several plurals.
 * - replaces parameters in translations.
 * - uses cookie information if jQuery.cookie is available.
 * - designed to be used by CouchApps.
 */

(function($) {

	// configuration, feel free to edit the following lines

	/**
	 * Language at the start of the application.
	 * If you use the jQuery's Cookie plugin, then the language will be stored
	 * in a cookie.
	 */
	var language = 'en';

	/**
	 * Name of cookie storing language. Change it if it conflicts.
	 * If you don't use the jQuery's Cookie plugin, it doesn't matter.
	 */
	var cookieName = 'locale';

	// end of configuration

	/**
	 * Intern dictionary.
	 */
	var dictionary;

	/**
	 * Standard replace function.
	 */
	var replace = function(str, opt) {
		var args = (typeof opt === 'object' && opt != null) ? opt : arguments;
		return str.replace(/&(\w+)/g, function(match, n) {
			var value = args[n];
			if (value === undefined) {
				return match;
			}
			return value;
		});
	};

	/**
	 * Default translator in case of error or unavailability...
	 */
	var lambda = function(key, opt) {
		var args = (typeof opt === 'object' && opt != null) ? opt : arguments;
		return replace(key, args);
	};

	// load language from cookie
	if ($.cookie) {
		language = $.cookie(cookieName) || language;
	}

    // Store missing keys for translation purpose
    var missing_keys = [];

	$.tr = {

        missing_keys: missing_keys,

		/**
		 * @name $.tr.dictionary
		 * @brief Get the current dictionary.
		 * @returns object dictionary.
		 *
		 * Example: Gets the current dictionary.
		 * @code
		 * var dict = $.tr.dictionary();
		 * @endcode
		 */
		/**
		 * @name $.tr.dictionary
		 * @brief Set the current dictionary.
		 * @param object newDictionary new dictionary.
		 *
		 * Example: Sets the current dictionary.
		 * @code
		 * $.tr.dictionary(dict);
		 * @endcode
		 */
		dictionary : function(newDictionary) {
			if (newDictionary !== undefined) {
				dictionary = newDictionary;
			}
			return dictionary;
		},

		/**
		 * @name $.tr.language
		 * @brief Get the current language.
		 * @returns string language.
		 *
		 * Example: Gets the current language.
		 * @code
		 * var lg = $.tr.language();
		 * @endcode
		 */
		/**
		 * @name $.tr.language
		 * @brief Set the current language.
		 * @param string newLanguage new language.
		 * @param bool useCookie optional if true and cookie plugin is
		 * available, do nothing (allows to use a default language)
		 * @returns string language.
		 *
		 * Example: Sets the current language.
		 * @code
		 * $.tr.language('fr');
		 * @endcode
		 */
		language : function(newLanguage, useCookie) {
			if (newLanguage !== undefined) {
				if (useCookie && $.cookie) {
					var cookieLanguage = $.cookie(cookieName);
					if (cookieLanguage) {
						return cookieLanguage;
					}
				}
				language = newLanguage;
				if ($.cookie) {
					$.cookie(cookieName, language);
				}
			}
			return language;
		},

		/**
		 * @name $.tr.translator
		 * @brief Get a translator function.
		 * @param object customDictionary optional associative array replacing the
		 * library dictionary.
		 * @param mixed ... list of keys to traverse the dictionary.
		 * @returns function
		 */
		translator : function(customDictionary) {

			// varargs
			var args = $.makeArray(arguments);

			// which dictionary to use
			var dict = dictionary;
			if (typeof customDictionary == 'object') {
				args.shift();
				dict = customDictionary;
			}

			// if the chosen dictionary is not available...
			if (!dict) {
				return lambda;
			}

			// parse through the hierarchy
			var langSet = dict;
			for (var i in args) {
				langSet = langSet[args[i]];
				if (!langSet) {
					return lambda;
				}
			}

			// dictionary for the chosen language
			var lang = langSet[language];

			// if lang is an associative map encoded as a string, parse the map
			if (typeof lang == 'function') {
				lang = lang();
			}

			// if the chosen language is not available...
			if (!lang) {
				return lambda;
			}

			// time to get the real translator
			return function(key, opt) {
				var value = lang[key];
                if ( ! value && -1 === missing_keys.indexOf(key)){
                  missing_keys.push(key)
                }
				var args = (typeof opt === 'object' && opt != null) ? opt : arguments;
				if (typeof value === 'string') {
					return replace(value, args);
				} else if (typeof value === 'function') {
					return value(args, replace);
				} else if (typeof value === 'number') {
					return value;
				} else {
					return replace(key, args);
				}
			};
		}

	};

})(jQuery);

// Translation logic
var available_locales = {
    "en": {
      "label": "English",
      "pattern": "en"
    },
    "fr": {
      "label": "Français",
      "pattern": "fr"
    },
    "de": {
      "label": "Deutsch",
      "pattern": "de"
    },
    "da": {
      "label": "Dansk",
      "pattern": "da"
    },
    "nb_no": {
      "label": "Norsk Bokmål",
      "pattern": "nb"
    },
    "uk": {
      "label": "Українська",
      "pattern": "uk"
    },
    "ta": {
      "label": "தமிழ்",
      "pattern": "ta"
    }
  };

var browser_locale = $.cookie("locale") || getFirstBrowserLocale();

function locale_match(needle){
  for ( var locale in available_locales){
    var pattern = available_locales[locale]["pattern"]
    if( needle.match(RegExp("^"+pattern, "i"))){
      return locale;
    }
  }
  return "en";
}

  function change_locale ( locale ) {
    var reload_fn = function(){
      $.cookie("locale",locale);
      window.location.href = window.location.href
      };
    setTimeout(reload_fn, 100);
  }

var inklewriter_locale = locale_match(browser_locale, available_locales);

var tr = $.tr.translator();
document.tr = tr;

$.tr.language(inklewriter_locale, true);

$.ajax(
  {
    dataType: "json",
    url: '/translations/dictionary.'+inklewriter_locale+".json",
    async: false,
    success: function(data) {
      var dict = {}
      dict[inklewriter_locale] = data
      $.tr.dictionary(dict);
      tr = $.tr.translator();
    },
    error: function(a,b){
      console.log("Failed to load dictionary",a,b)
    }
  }
);
