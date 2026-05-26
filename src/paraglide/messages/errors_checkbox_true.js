/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Errors_Checkbox_TrueInputs */

const en_errors_checkbox_true = /** @type {(inputs: Errors_Checkbox_TrueInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`checkbox must be checked`)
};

const id_errors_checkbox_true = /** @type {(inputs: Errors_Checkbox_TrueInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`kotak harus dicentang`)
};

/**
* | output |
* | --- |
* | "checkbox must be checked" |
*
* @param {Errors_Checkbox_TrueInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const errors_checkbox_true = /** @type {((inputs?: Errors_Checkbox_TrueInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Errors_Checkbox_TrueInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_errors_checkbox_true(inputs)
	return id_errors_checkbox_true(inputs)
});
export { errors_checkbox_true as "errors.checkbox.true" }