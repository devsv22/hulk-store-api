/**
 * @typedef {import('../product').Product} Product
 * @typedef {import('../supplier').Supplier} Supplier
 */

export class KardexIdentifier {
  /** @type {Product} */
  product;

  /** @type {string} */
  reference;

  /** @type {Supplier} */
  supplier;

  /** @type {number} */
  maxItems;

  /** @type {number} */
  minItems;
}
