import { MemoryDb } from '@/config/db';
import { Product } from '@/models/product';

/**
 * @typedef {import('@//dto/product').ProductDto} ProductDto
 */

export class ProductController {
  /**
   * @return {Product[]} - list of products
   */
  getAll() {
    return MemoryDb.get('products', []);
  }

  /**
   *
   * @param {ProductDto} body - product to be added
   * @returns - api response
   */
  addProduct({ name, description, price }) {
    /** @type {Product[]} */
    const products = MemoryDb.get('products', []);

    MemoryDb.add('products', [
      ...products,
      new Product(name, description, price),
    ]);

    return null;
  }
}
