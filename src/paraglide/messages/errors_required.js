/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ name: NonNullable<unknown> }} Errors_RequiredInputs */

const en_errors_required = /** @type {(inputs: Errors_RequiredInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.name} is required`)
};

const id_errors_required = /** @type {(inputs: Errors_RequiredInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.name} wajib diisi`)
};

/**
* | output |
* | --- |
* | "{name} is required" |
*
* @param {Errors_RequiredInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const errors_required = /** @type {((inputs: Errors_RequiredInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Errors_RequiredInputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_errors_required(inputs)
	return id_errors_required(inputs)
});
export { errors_required as "errors.required" }