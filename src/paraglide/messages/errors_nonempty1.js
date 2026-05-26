/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ name: NonNullable<unknown> }} Errors_Nonempty1Inputs */

const en_errors_nonempty1 = /** @type {(inputs: Errors_Nonempty1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.name} is required`)
};

const id_errors_nonempty1 = /** @type {(inputs: Errors_Nonempty1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.name} wajib diisi`)
};

/**
* | output |
* | --- |
* | "{name} is required" |
*
* @param {Errors_Nonempty1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const errors_nonempty1 = /** @type {((inputs: Errors_Nonempty1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Errors_Nonempty1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_errors_nonempty1(inputs)
	return id_errors_nonempty1(inputs)
});
export { errors_nonempty1 as "errors.nonEmpty" }