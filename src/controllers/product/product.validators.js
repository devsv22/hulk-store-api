import { body } from 'express-validator';

export const productValidators = [
  body('name').isString(),
  body('description').isString(),
  body('price').isNumeric(),
];
