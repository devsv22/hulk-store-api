import * as uuid from 'uuid';

export class Supplier {
  /** @type {number} */
  id;

  /** @type {string} */
  name;

  constructor(name) {
    this.id = uuid.v4();
    this.name = name;
  }
}
