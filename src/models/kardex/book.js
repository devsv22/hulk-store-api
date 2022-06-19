/**
 * @typedef {import('./detail').KardexDetail} Detail
 */

export class KardexBook {
  /** @type {Detail[]} */
  income;

  /** @type {Detail[]} */
  outcome;

  constructor(income, outcome) {
    this.income = income;
    this.outcome = outcome;
  }
}
