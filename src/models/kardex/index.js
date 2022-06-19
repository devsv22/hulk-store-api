import * as uuid from 'uuid';

/**
 * @typedef {import('./card').KardexCard} Card
 * @typedef {import('./book').KardexBook} Book
 */

export class Kardex {
  /** @type {string} */
  id;

  /** @type {Card} */
  card;

  /** @type {Book} */
  book;

  constructor(card, book) {
    this.id = uuid.v4();
    this.card = card;
    this.book = book;
  }
}
