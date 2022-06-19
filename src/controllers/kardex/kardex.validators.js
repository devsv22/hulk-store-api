import { body } from 'express-validator';

export const registryProductValidations = [
  body('supplierId').isString(),
  body('productId').isString(),
  body('maxItems').isNumeric(),
  body('minItems').isNumeric(),
  body('reference').isString(),
];

export const kardexEntriesValidations = [
  body('kardexId').isString(),
  body('detail').isObject().default({
    quantity: 0,
    date: null,
    unitValue: 0,
    totalValue: 0,
    concept: null,
  }),
  body('date').isString(),
];
