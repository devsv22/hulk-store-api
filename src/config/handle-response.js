import { handleError } from './handle-error';
import { validationResult } from 'express-validator';

/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 *
 * @param {Response} res
 * @param {unknown} callback
 * @param {number} successStatusCode
 * @returns - api response
 */
export const handleResponse = (res, callback, successStatusCode = 200) => {
  const result = handleError(callback, res);

  if (result !== undefined) {
    return res.status(successStatusCode).json(result);
  }

  return result;
};

export const hasErrors = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return true;
  }
  return false;
};
