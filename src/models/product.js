import * as uuid from 'uuid';

export class Product {
  /** @type {string} */
  id;

  /** @type {string} */
  name;

  /** @type {string} */
  description;

  /** @type {number} */
  price;

  constructor(name, description, price) {
    this.id = uuid.v4();
    this.name = name;
    this.description = description;
    this.price = price;
  }
}
