import { Router } from 'express';
import ProductsRouter from '@/controllers/product/product.routes';
import SupplierRouter from '@/controllers/supplier/supplier.routes';
import KardexRouter from '@/controllers/kardex/kardex.routes';

const router = Router();

router.use('/products', ProductsRouter);
router.use('/suppliers', SupplierRouter);
router.use('/kardex', KardexRouter);

export default router;
