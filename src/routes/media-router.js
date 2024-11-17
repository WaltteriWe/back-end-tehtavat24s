import express from 'express';
import multer from 'multer';
import {
  getItemById,
  getItems,
  getLikesByMediaId,
  getLikesByUserId,
  postItem,
  postLike,
} from '../controllers/media-controller.js';
import { removeLike } from '../models/media-model.js';

const upload = multer({dest: 'uploads/'});

const mediaRouter = express.Router();

// mediaRouter.get('/api', (req, res) => {
//   res.render('index', {
//     title: 'API Documentation',
//     message: 'TODO: include docs here!',
//     // exampleData: mediaItems,
//   });
// });

// Media resource endpoints
mediaRouter.route('/').get(getItems).post(upload.single('file'), postItem);

mediaRouter.route('/:id').get(getItemById);

mediaRouter.put('/:id', (req, res) => {
  // TODO: implement this endpoint
  res.status(501).json({message: 'Under construction'});
});

// Likes resource endpoints

// Get likes for a specific media item
mediaRouter.get('/media/:id', getLikesByMediaId);

// Get likes by a specific user
mediaRouter.get('/user/:id', getLikesByUserId);

// Add a like for a specific media item
mediaRouter.post('/', postLike)

// remove like from a specific media item
mediaRouter.delete('/:id', removeLike);

export default mediaRouter;
