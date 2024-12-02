import express from 'express';
import {
  DeleteUser,
  getUserById,
  getUsers,
  postUser,
  putUser,
} from '../controllers/user-controller.js';
import { body } from 'express-validator';

const userRouter = express.Router();

userRouter.route('/')
  .get(getUsers)
  .post(
    body('email').trim().isEmail(),
    body('username').trim().isLength({min: 3, max: 20}).isAlphanumeric(),
    body('password').trim().isLength({min: 8}),
    postUser
  );
userRouter.route('/:id').get(getUserById).put(putUser).delete(DeleteUser);

export default userRouter;