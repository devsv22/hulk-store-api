import { ProductController } from '@/controllers/product/product.controller';

const mockProduct = {
  name: 'test',
  description: 'description',
  price: 0.1,
};

describe(ProductController, () => {
  let product = null;

  beforeEach(() => {
    product = new ProductController();
  });

  it('should show the product list', () => {
    expect(product.getAll().length).toEqual(0);

    product.addProduct(mockProduct);
    product.addProduct(mockProduct);

    expect(product.getAll().length).toEqual(2);
  });

  it('should add a product', () => {
    product.addProduct(mockProduct);

    const current = product.getAll()?.[0] ?? null;

    expect(current).not.toBeNull();
    expect(current.id).toBeTruthy();
  });
});
