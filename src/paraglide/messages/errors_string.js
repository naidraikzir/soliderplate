/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ name: NonNullable<unknown> }} Errors_StringInputs */

const en_errors_string = /** @type {(inputs: Errors_StringInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.name} is required`)
};

const id_errors_string = /** @type {(inputs: Errors_StringInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.name} wajib diisi`)
};

/**
* | output |
* | --- |
* | "{name} is required" |
*
* @param {Errors_StringInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const errors_string = /** @type {((inputs: Errors_StringInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Errors_StringInputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_errors_string(inputs)
	return id_errors_string(inputs)
});
export { errors_string as "errors.string" }