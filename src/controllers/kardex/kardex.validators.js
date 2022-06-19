import { body } from 'express-validator';

export const registryProduct = [
  body('supplierId').isString(),
  body('productId').isString(),
  body('maxItems').isNumeric(),
  body('minItems').isNumeric(),
  body('reference').isString(),
];
