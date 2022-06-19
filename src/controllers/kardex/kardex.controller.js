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

const NOT_FOUND = { message: 'Invalid Kardex', statusCode: 404 };

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

    return new HandleError(NOT_FOUND);
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

    return new HandleError(NOT_FOUND);
  }

  getBookIncome(kardexId = '') {
    /** @type {Kardex | null} */
    const kardex = MemoryDb.findOne('kardex', kardexId);

    if (kardex) {
      return kardex.book.income;
    }

    return new HandleError(NOT_FOUND);
  }

  getBookOutcome(kardexId = '') {
    /** @type {Kardex | null} */
    const kardex = MemoryDb.findOne('kardex', kardexId);

    if (kardex) {
      return kardex.book.outcome;
    }

    return new HandleError(NOT_FOUND);
  }

  getBalance(kardexId = '') {
    /** @type {Kardex | null} */
    const kardex = MemoryDb.findOne('kardex', kardexId);

    if (kardex) {
      const {
        book: { income, outcome },
        card: { reference, product },
        id,
      } = kardex;

      /** @type {[number, number]} */
      const incomeSum = income
        .map(({ quantity, totalValue }) => [quantity, totalValue])
        .reduce((prev, current) => {
          return [
            prev.at(0) + current.at(0), // quantity
            prev.at(1) + current.at(1), // total value
          ];
        });

      /** @type {[number, number]} */
      const outcomeSum = outcome
        .map(({ quantity, totalValue }) => [quantity, totalValue])
        .reduce((prev, current) => {
          return [
            prev.at(0) + current.at(0), // quantity
            prev.at(1) + current.at(1), // total value
          ];
        });

      return {
        kardexId: id,
        product,
        reference,
        book: {
          income: incomeSum,
          outcome: outcomeSum,
          detail: {
            quantity: incomeSum.at(0) - outcomeSum.at(0),
            totalValue: incomeSum.at(1) - outcomeSum.at(1),
          },
        },
      };
    }

    return new HandleError(NOT_FOUND);
  }
}
