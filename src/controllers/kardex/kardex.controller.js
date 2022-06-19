import { Kardex } from '@/models/kardex';

/**
 * @typedef {import('@/dto/kardex-registry').KardexRegistry} Registry
 * @typedef {import('@/models/product').Product} Product
 * @typedef {import('@/models/supplier').Supplier} Supplier
 * @typedef {import('@/dto/kardex-book').KardexEntriesDto} EntriesDto
 */

import { MemoryDb } from '@/config/db';
import { KardexCard } from '@/models/kardex/card';
import { KardexBook } from '@/models/kardex/book';
import { HandleError } from '@/config/handle-error';

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

  /** @param {EntriesDto} */
  addIncome({ kardexId, detail }) {
    /** @type {Kardex | null} */
    const kardex = MemoryDb.findOne('kardex', kardexId);

    if (kardex) {
      /** @type {Kardex[]} */
      const kardexList = MemoryDb.get('kardex', []);
      kardex.book.income.push(detail);

      MemoryDb.add('kardex', [
        ...kardexList.filter(({ id }) => id !== kardexId),
        kardex,
      ]);

      return null;
    }

    return new HandleError({
      message: 'Invalid kardex',
      statusCode: 404,
    });
  }

  /** @param {EntriesDto} */
  addOutcome({ kardexId, detail }) {
    /** @type {Kardex | null} */
    const kardex = MemoryDb.findOne('kardex', kardexId);

    if (kardex) {
      /** @type {Kardex[]} */
      const kardexList = MemoryDb.get('kardex', []);
      kardex.book.outcome.push(detail);

      MemoryDb.add('kardex', [
        ...kardexList.filter(({ id }) => id !== kardexId),
        kardex,
      ]);

      return null;
    }

    return new HandleError({
      message: 'Invalid kardex',
      statusCode: 404,
    });
  }
}
