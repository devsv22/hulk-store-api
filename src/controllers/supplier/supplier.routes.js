import { handleResponse, hasErrors } from '@/config/handle-response';
import { Router } from 'express';
import { SupplierController } from './supplier.controller';

const router = Router();

const controller = new SupplierController();

router.get('/', (_, res) => res.json(controller.getAll()));

router.post('/', (req, res) => {
  if (!hasErrors(req, res)) {
    handleResponse(res, controller.addSupplier(req.body), 201);
  }
});

export default router;
