import { Router } from 'express';
import ProductsRouter from '../controllers/product/product.routes';

const router = Router();

router.use('/products', ProductsRouter);

export default router;
