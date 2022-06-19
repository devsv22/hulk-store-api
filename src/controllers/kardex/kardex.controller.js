import { Kardex } from '@/models/kardex';

/**
 * @typedef {import('@/dto/kardex-registry').KardexRegistry} Registry
 * @typedef {import('@/models/product').Product} Product
 * @typedef {import('@/models/supplier').Supplier} Supplier
 */

import { MemoryDb } from '@/config/db';
import { KardexCard } from '@/models/kardex/card';
import { KardexBook } from '@/models/kardex/book';

export class KardexController {
  /** @returns {Kardex[]} */
  getAll() {
    return MemoryDb.get('kardex', []);
  }

  /** @param {Registry} */
  registerProduct({ supplierId, productId, maxItems, minItems, reference }) {
    /** @type {Product | null} */
    const product = MemoryDb.findOne('products', productId);
    /** @type {Supplier | null} */
    const supplier = MemoryDb.findOne('suppliers', supplierId);

    const card = new KardexCard(
      product,
      supplier,
      maxItems,
      minItems,
      reference,
    );

    const book = new KardexBook([], []);

    const kardexRegistry = new Kardex(card, book);

    /** @type {Kardex[]} */
    const list = MemoryDb.get('kardex', []);

    MemoryDb.add('kardex', [...list, kardexRegistry]);

    return null;
  }
}
