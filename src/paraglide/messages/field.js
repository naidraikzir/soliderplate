/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} FieldInputs */

const en_field = /** @type {(inputs: FieldInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`field`)
};

const id_field = /** @type {(inputs: FieldInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`isian`)
};

/**
* | output |
* | --- |
* | "field" |
*
* @param {FieldInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
export const field = /** @type {((inputs?: FieldInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<FieldInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_field(inputs)
	return id_field(inputs)
});