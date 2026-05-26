/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Block_NavigationInputs */

const en_block_navigation = /** @type {(inputs: Block_NavigationInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`are you sure you want to leave? changes you made may not be saved.`)
};

const id_block_navigation = /** @type {(inputs: Block_NavigationInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`apakah anda yakin ingin meninggalkan halaman ini? perubahan yang belum disimpan akan hilang.`)
};

/**
* | output |
* | --- |
* | "are you sure you want to leave? changes you made may not be saved." |
*
* @param {Block_NavigationInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
export const block_navigation = /** @type {((inputs?: Block_NavigationInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Block_NavigationInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_block_navigation(inputs)
	return id_block_navigation(inputs)
});