import express from 'express';
import {
  DeleteUser,
  getUserById,
  getUsers,
  postUser,
  putUser,
} from '../controllers/user-controller.js';

const userRouter = express.Router();

userRouter.route('/').get(getUsers).post(postUser);

userRouter.route('/:id').get(getUserById).put(putUser).delete(DeleteUser);

export default userRouter;