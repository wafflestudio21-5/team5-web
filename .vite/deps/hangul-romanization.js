import { __commonJS } from './chunk-ZS7NZCD4.js';

// node_modules/hangul-romanization/dist/conversionSystems/revisedRomanizationOfKorean.js
var require_revisedRomanizationOfKorean = __commonJS({
	'node_modules/hangul-romanization/dist/conversionSystems/revisedRomanizationOfKorean.js'(
		exports
	) {
		'use strict';
		Object.defineProperty(exports, '__esModule', { value: true });
		exports.REVISED_ROMANIZATION_OF_KOREAN = void 0;
		exports.REVISED_ROMANIZATION_OF_KOREAN = {
			vowels: [
				'a',
				'ae',
				'ya',
				'yee',
				'eo',
				'e',
				'yeo',
				'ye',
				'o',
				'wa',
				'wae',
				'oe',
				'yo',
				'u',
				'wo',
				'we',
				'wi',
				'yu',
				'eu',
				'ui',
				'i',
				// ㅣ
			],
			consonants: {
				initial: [
					'g',
					'kk',
					'n',
					'd',
					'tt',
					'r',
					'm',
					'b',
					'pp',
					's',
					'ss',
					'',
					'j',
					'jj',
					'ch',
					'k',
					't',
					'p',
					'h',
					// ㅎ
				],
				final: [
					'',
					'k',
					'k',
					'kt',
					'n',
					'nt',
					'nh',
					't',
					'l',
					'lk',
					'lm',
					'lp',
					'lt',
					'lt',
					'lp',
					'lh',
					'm',
					'p',
					'pt',
					't',
					'tt',
					'ng',
					't',
					't',
					'k',
					't',
					'p',
					'h',
					// ㅎ
				],
			},
		};
	},
});

// node_modules/hangul-romanization/dist/index.js
var require_dist = __commonJS({
	'node_modules/hangul-romanization/dist/index.js'(exports) {
		Object.defineProperty(exports, '__esModule', { value: true });
		exports.convert = void 0;
		var revisedRomanizationOfKorean_1 = require_revisedRomanizationOfKorean();
		var UNICODE_OFFSET = 44032;
		var UNICODE_MAX = 55215;
		function convertCharacter(char) {
			var charCode = char.charCodeAt(0);
			var isHangul = charCode >= UNICODE_OFFSET && charCode < UNICODE_MAX;
			if (isHangul) {
				var unicodeOffset = charCode - UNICODE_OFFSET;
				var trailerOffset =
					unicodeOffset %
					revisedRomanizationOfKorean_1.REVISED_ROMANIZATION_OF_KOREAN
						.consonants.final.length;
				unicodeOffset -= trailerOffset;
				unicodeOffset /=
					revisedRomanizationOfKorean_1.REVISED_ROMANIZATION_OF_KOREAN
						.consonants.final.length;
				var vowelOffset =
					unicodeOffset %
					revisedRomanizationOfKorean_1.REVISED_ROMANIZATION_OF_KOREAN.vowels
						.length;
				unicodeOffset -= vowelOffset;
				unicodeOffset /=
					revisedRomanizationOfKorean_1.REVISED_ROMANIZATION_OF_KOREAN.vowels
						.length;
				var leadOffset = unicodeOffset;
				var result =
					revisedRomanizationOfKorean_1.REVISED_ROMANIZATION_OF_KOREAN
						.consonants.initial[leadOffset] +
					revisedRomanizationOfKorean_1.REVISED_ROMANIZATION_OF_KOREAN.vowels[
						vowelOffset
					] +
					revisedRomanizationOfKorean_1.REVISED_ROMANIZATION_OF_KOREAN
						.consonants.final[trailerOffset];
				return result;
			}
			return char;
		}
		function convert(text) {
			return text.split('').map(convertCharacter).join('');
		}
		exports.convert = convert;
	},
});
export default require_dist();
/*! Bundled license information:

hangul-romanization/dist/conversionSystems/revisedRomanizationOfKorean.js:
  (**
   * @license MIT Copyright 2016 Daniel Imms (http://www.growingwiththeweb.com)
   *)

hangul-romanization/dist/index.js:
  (**
   * @license MIT Copyright 2016 Daniel Imms (http://www.growingwiththeweb.com)
   *)
*/
//# sourceMappingURL=hangul-romanization.js.map
