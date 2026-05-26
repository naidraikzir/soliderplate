/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} __Inputs */

const en___ = /** @type {(inputs: __Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (``)
};

const id___ = /** @type {(inputs: __Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (``)
};

/**
* | output |
* | --- |
* | "" |
*
* @param {__Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const __ = /** @type {((inputs?: __Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<__Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en___(inputs)
	return id___(inputs)
});
export { __ as "//" }