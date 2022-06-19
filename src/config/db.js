export class MemoryDb {
  static #collection = {};

  static add(key, value) {
    this.#collection[key] = value;
  }

  static get(key, defaultValue = null) {
    return this.#collection[key] ?? defaultValue;
  }

  static remove(key) {
    delete this.#collection[key];
  }

  static clear() {
    this.#collection = {};
  }

  static keys() {
    return Object.keys(this.#collection);
  }

  static findOne(key, id = null) {
    /** @type {Object[] | null} */
    const entries = this.get(key, null);

    if (entries) {
      const value = entries.find(({ id: current }) => current === id);
      return value ?? undefined;
    }

    return null;
  }
}
