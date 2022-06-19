import { Router } from 'express';
import ProductsRouter from '@/controllers/product/product.routes';
import SupplierRouter from '@/controllers/supplier/supplier.routes';

const router = Router();

router.use('/products', ProductsRouter);
router.use('/supplier', SupplierRouter);

export default router;
