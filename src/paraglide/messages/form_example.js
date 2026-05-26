/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Form_ExampleInputs */

const en_form_example = /** @type {(inputs: Form_ExampleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`form example`)
};

const id_form_example = /** @type {(inputs: Form_ExampleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`contoh form`)
};

/**
* | output |
* | --- |
* | "form example" |
*
* @param {Form_ExampleInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
export const form_example = /** @type {((inputs?: Form_ExampleInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Form_ExampleInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_form_example(inputs)
	return id_form_example(inputs)
});