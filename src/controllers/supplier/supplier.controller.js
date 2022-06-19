import { MemoryDb } from '@/config/db';
import { Supplier } from '@/models/supplier';

/**
 * @typedef {import('@/dto/supplier').SupplierDto} SupplierDto
 */

export class SupplierController {
  /** @return {Supplier[]} - supplier list */
  getAll() {
    return MemoryDb.get('suppliers', []);
  }

  /** @param {SupplierDto} */
  addSupplier({ name }) {
    /** @type {Supplier[]} */
    const suppliers = MemoryDb.get('suppliers', []);

    MemoryDb.add('suppliers', [...suppliers, new Supplier(name)]);

    return null;
  }
}
