import {validationResult} from 'express-validator';
import {addUser} from '../models/user-model.js';

const postUser = async (req, res, next) => {
  // validation errors can be retrieved from the request object (added by express-validator middleware)
  const errors = validationResult(req);
  // check if any validation errors
  if (!errors.isEmpty()) {
    // pass the error to the error handler middleware
    const error = new Error('Invalid or missing fields');
    error.status = 400;
    return next(error);
  }
  // TODO: add password hashing here and error handling for SQL errors
  const newUserId = await addUser(req.body);
  res.json({message: 'new user added', user_id: newUserId});
};

export {postUser};
