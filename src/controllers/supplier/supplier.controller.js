import { MemoryDb } from '@/config/db';

/**
 * @typedef {import('@/models/supplier').Supplier} Supplier
 */

export class SupplierController {
  /** @return {Supplier[]} - supplier list */
  getAll() {
    return MemoryDb.get('suppliers') ?? [];
  }

  addSupplier(supplier) { }
}
