/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ name: NonNullable<unknown>, min: NonNullable<unknown> }} Errors_Minlength1Inputs */

const en_errors_minlength1 = /** @type {(inputs: Errors_Minlength1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.name} must be at least ${i?.min} characters`)
};

const id_errors_minlength1 = /** @type {(inputs: Errors_Minlength1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.name} harus memiliki minimal ${i?.min} karakter`)
};

/**
* | output |
* | --- |
* | "{name} must be at least {min} characters" |
*
* @param {Errors_Minlength1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const errors_minlength1 = /** @type {((inputs: Errors_Minlength1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Errors_Minlength1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_errors_minlength1(inputs)
	return id_errors_minlength1(inputs)
});
export { errors_minlength1 as "errors.minLength" }