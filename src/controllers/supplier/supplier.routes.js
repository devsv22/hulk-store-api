import { Router } from 'express';
import { SupplierController } from './supplier.controller';

const router = Router();

const controller = new SupplierController();

router.get('/', (_, res) => res.json(controller.getAll()));

export default router;
