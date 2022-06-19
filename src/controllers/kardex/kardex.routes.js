import { handleResponse, hasErrors } from '@/config/handle-response';
import { Router } from 'express';
import { KardexController } from './kardex.controller';
import { registryProduct } from './kardex.validators';

const router = Router();

const controller = new KardexController();

router.get('/', (_, res) => res.json(controller.getAll()));

router.post('/registry', ...registryProduct, (req, res) => {
  if (!hasErrors(req, res)) {
    handleResponse(res, controller.registerProduct(req.body), 201);
  }
});

export default router;
