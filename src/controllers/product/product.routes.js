import { Router } from 'express';
import { handleResponse, hasErrors } from '@/config/handle-response';
import { ProductController } from './product.controller';
import { productValidators } from './product.validators';

const router = Router();
const controller = new ProductController();

router.get('/', (_, res) => res.json(controller.getAll()));

router.post('/', ...productValidators, (req, res) => {
  if (!hasErrors(req, res)) {
    handleResponse(res, controller.addProduct(req.body), 201);
  }
});

export default router;
