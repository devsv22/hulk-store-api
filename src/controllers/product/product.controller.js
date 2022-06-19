import { MemoryDb } from '@/config/db';
import * as uuid from 'uuid';

/**
 * @typedef {import('@/models/product').Product} Product
 * @typedef {import('@//dto/product').ProductDto} ProductDto
 */

export class ProductController {
  /**
   * @return {Product[]} - list of products
   */
  getAll() {
    return MemoryDb.get('products') ?? [];
  }

  /**
   *
   * @param {ProductDto} body - product to be added
   * @returns - api response
   */
  addProduct(product) {
    /** @type {Product[]} */
    const products = MemoryDb.get('products') ?? [];

    MemoryDb.add('products', [
      ...products,
      {
        ...product,
        id: uuid.v4(),
        createdAt: new Date(),
      },
    ]);

    return null;
  }
}
