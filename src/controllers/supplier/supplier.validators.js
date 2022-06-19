import { body } from 'express-validator';

export const supplierValidators = [body('name').isString()];
