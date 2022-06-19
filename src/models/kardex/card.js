/**
 * @typedef {import('../product').Product} Product
 * @typedef {import('../supplier').Supplier} Supplier
 */

export class KardexCard {
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

  constructor(product, supplier, maxItems, minItems, reference) {
    this.product = product;
    this.supplier = supplier;
    this.maxItems = maxItems;
    this.minItems = minItems;
    this.reference = reference;
  }
}
