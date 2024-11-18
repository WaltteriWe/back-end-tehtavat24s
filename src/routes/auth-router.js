import express from 'express';
import {postLogin} from '../controllers/auth-controller.js';

const authRouter = express.Router();

authRouter.post('/login', postLogin);

export default authRouter;
