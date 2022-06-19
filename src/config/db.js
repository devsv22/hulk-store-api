export class MemoryDb {
  static #collection = {};

  static add(key, value) {
    this.#collection[key] = value;
  }

  static get(key) {
    return this.#collection[key];
  }

  static remove(key) {
    delete this.#collection[key];
  }

  static clear() {
    this.#collection = {};
  }
}
