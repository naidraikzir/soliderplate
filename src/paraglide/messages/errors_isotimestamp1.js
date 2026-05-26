/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ name: NonNullable<unknown> }} Errors_Isotimestamp1Inputs */

const en_errors_isotimestamp1 = /** @type {(inputs: Errors_Isotimestamp1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.name} is required`)
};

const id_errors_isotimestamp1 = /** @type {(inputs: Errors_Isotimestamp1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.name} wajib diisi`)
};

/**
* | output |
* | --- |
* | "{name} is required" |
*
* @param {Errors_Isotimestamp1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const errors_isotimestamp1 = /** @type {((inputs: Errors_Isotimestamp1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Errors_Isotimestamp1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_errors_isotimestamp1(inputs)
	return id_errors_isotimestamp1(inputs)
});
export { errors_isotimestamp1 as "errors.isoTimestamp" }