import { MemoryDb } from '@/config/db';
import { HandleError } from '@/config/handle-error';
import { KardexController } from '@/controllers/kardex/kardex.controller';
import { ProductController } from '@/controllers/product/product.controller';
import { SupplierController } from '@/controllers/supplier/supplier.controller';

/**
 * @typedef {import('@/models/kardex').Kardex} Kardex
 */

const mockFalsyEntry = {
  kardexId: 'no-valid-id',
  detail: {},
};

describe(KardexController, () => {
  /** @type {KardexController} */
  let controller = null;

  beforeEach(() => {
    controller = new KardexController();
  });

  it('should show an empty kardex list', () => {
    const list = MemoryDb.get('kardex', []);

    expect(list.length).toBe(0);
  });

  it('should show an error when we try to add a new entry | income', () => {
    const result = controller.addIncome(mockFalsyEntry);

    expect(result instanceof HandleError).toBeTruthy();
    expect(result.error.statusCode).toBe(404);
  });

  it('should show an error when we try to add a new entry | outcome', () => {
    const result = controller.addOutcome(mockFalsyEntry);

    expect(result instanceof HandleError).toBeTruthy();
    expect(result.error.statusCode).toBe(404);
  });

  it('should add a kardex entry', () => {
    const productController = new ProductController();
    const supplierController = new SupplierController();

    productController.addProduct({
      name: 'foo',
      description: 'description',
      price: 0.1,
    });

    supplierController.addSupplier({
      name: 'coca cola',
    });

    const currentProduct = productController.getAll().at(0) ?? null;
    const currentSupplier = supplierController.getAll().at(0) ?? null;

    expect(currentProduct).not.toBeNull();
    expect(currentSupplier).not.toBeNull();

    controller.registerProduct({
      maxItems: 10,
      minItems: 5,
      productId: currentProduct.id,
      supplierId: currentSupplier.id,
      reference: 'PRODUCT_REF',
    });

    const currentKardex = controller.getAll().at(0) ?? null;

    expect(currentKardex).not.toBeNull();
    expect(currentKardex.card.product).toBe(currentProduct);
    expect(currentKardex.card.supplier).toBe(currentSupplier);
    expect(currentKardex.book.income.length).toBe(0);
    expect(currentKardex.book.outcome.length).toBe(0);
    expect(currentKardex.card.reference).toEqual('PRODUCT_REF');
  });

  it('should add a new book entry', () => {
    const productController = new ProductController();
    const supplierController = new SupplierController();

    productController.addProduct({
      name: 'foo',
      description: 'description',
      price: 0.1,
    });

    supplierController.addSupplier({
      name: 'coca cola',
    });

    const currentProduct = productController.getAll().at(0);
    const currentSupplier = supplierController.getAll().at(0);

    controller.registerProduct({
      maxItems: 10,
      minItems: 5,
      productId: currentProduct.id,
      supplierId: currentSupplier.id,
      reference: 'PRODUCT_REF',
    });

    const currentKardex = controller.getAll().at(0);

    controller.addIncome({
      detail: {
        concept: null,
        date: new Date(),
        quantity: 100,
        totalValue: 100,
        unitValue: 1,
      },
      kardexId: currentKardex.id,
    });

    controller.addOutcome({
      detail: {
        concept: 'outcome test',
        date: new Date(),
        quantity: 1,
        totalValue: 1,
        unitValue: 1,
      },
      kardexId: currentKardex.id,
    });

    /** @type {Kardex} */
    const currentBook = MemoryDb.findOne('kardex', currentKardex.id);

    expect(currentBook.book.income.length).toBe(1);
    expect(currentBook.book.outcome.length).toBe(1);
    expect(currentBook.book.outcome.at(0).concept).toEqual('outcome test');
    expect(currentBook.book.income.at(0).totalValue).toEqual(100);
  });

  it('should return correct balance', () => {
    const productController = new ProductController();
    const supplierController = new SupplierController();

    productController.addProduct({
      name: 'foo',
      description: 'description',
      price: 0.1,
    });

    supplierController.addSupplier({
      name: 'coca cola',
    });

    const currentProduct = productController.getAll().at(0);
    const currentSupplier = supplierController.getAll().at(0);

    controller.registerProduct({
      maxItems: 10,
      minItems: 5,
      productId: currentProduct.id,
      supplierId: currentSupplier.id,
      reference: 'PRODUCT_REF',
    });

    const currentKardex = controller.getAll().at(0);

    controller.addIncome({
      detail: {
        concept: null,
        date: new Date(),
        quantity: 100,
        totalValue: 100,
        unitValue: 1,
      },
      kardexId: currentKardex.id,
    });

    controller.addOutcome({
      detail: {
        concept: 'outcome test',
        date: new Date(),
        quantity: 10,
        totalValue: 10,
        unitValue: 1,
      },
      kardexId: currentKardex.id,
    });

    const balance = controller.getBalance(currentKardex.id);

    expect(balance instanceof HandleError).toBeFalsy();
    expect(balance.product.id).toBe(currentProduct.id);
    expect(balance.reference).toEqual('PRODUCT_REF');
    expect(balance.book.income.length).toBe(2);
    expect(balance.book.outcome.length).toBe(2);
    expect(balance.book.detail).toStrictEqual({
      quantity: 90,
      totalValue: 90
    });
  });
});
