import { handleResponse, hasErrors } from '@/config/handle-response';
import { Router } from 'express';
import { KardexController } from './kardex.controller';
import {
  kardexEntriesValidations,
  registryProductValidations,
} from './kardex.validators';

const router = Router();

const controller = new KardexController();

router.get('/', (_, res) => res.json(controller.getAll()));

router.post('/registry', ...registryProductValidations, (req, res) => {
  if (!hasErrors(req, res)) {
    handleResponse(res, controller.registerProduct(req.body), 201);
  }
});

router.post('/income', ...kardexEntriesValidations, (req, res) => {
  if (!hasErrors(req, res)) {
    handleResponse(res, controller.addIncome(req.body));
  }
});

router.post('/outcome', ...kardexEntriesValidations, (req, res) => {
  if (!hasErrors(req, res)) {
    handleResponse(res, controller.addOutcome(req.body));
  }
});

router.get('/:id/income', (req, res) =>
  handleResponse(res, controller.getBookIncome(req.params.id)),
);

router.get('/:id/outcome', (req, res) =>
  handleResponse(res, controller.getBookOutcome(req.params.id)),
);

router.get('/:id/balance', (req, res) =>
  handleResponse(res, controller.getBalance(req.params.id)),
);

export default router;
