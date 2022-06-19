import { SupplierController } from '@/controllers/supplier/supplier.controller';

const mockSupplier = {
  name: 'mock-supplier',
};

describe(SupplierController, () => {
  /** @type {SupplierController} */
  let supplier = null;

  beforeEach(() => {
    supplier = new SupplierController();
  });

  it('should show the supplier list', () => {
    expect(supplier.getAll().length).toEqual(0);

    supplier.addSupplier(mockSupplier);
    supplier.addSupplier(mockSupplier);

    expect(supplier.getAll().length).toEqual(2);
  });

  it('should add a supplier', () => {
    supplier.addSupplier(mockSupplier);

    const current = supplier.getAll()?.[0] ?? null;

    expect(current).not.toBeNull();
    expect(current.id).toBeTruthy();
  });
});
