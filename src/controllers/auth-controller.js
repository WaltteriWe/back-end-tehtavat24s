import jwt from 'jsonwebtoken';
import {selectUserByUsernameAndPassword} from '../models/user-model.js';
import 'dotenv/config';

const postLogin = async (req, res) => {
  console.log('postLogin', req.body);
  const {username, password} = req.body;
  const user = await selectUserByUsernameAndPassword(username, password);
  if (user) {
    // Voi käyttää mahdollisesti myös pelkkää userID userin tilalla
    const token = jwt.sign(user, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_SECRET_IN,
    });
    res.json({...user, token});
  } else {
    res.sendStatus(401);
  }
};

const getMe = async (req, res) => {
  try {
    const user = await selectUserByUsernameAndPassword(
      req.user.username,
      req.user.password,
    );
    res.json(user);
  } catch (e) {
    console.error('getMe', e.message);
    res.status(503).json({error: 503, message: 'DB error'});
  }
  res.json(req.user);
};

export {postLogin, getMe};
