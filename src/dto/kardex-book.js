/**
 * @typedef {import('@/models/kardex/detail').KardexDetail} Detail
 */

export class KardexEntriesDto {
  /** @type {string} */
  kardexId;

  /** @type {Detail} */
  detail;
}
