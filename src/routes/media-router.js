import express from 'express';
import multer from 'multer';
import {
  deleteItem,
  getItemById,
  getItems,
  getLikesByMediaId,
  getLikesByUserId,
  postItem,
  postLike,
  putItem,
  removeLike,
} from '../controllers/media-controller.js';

const upload = multer({dest: 'uploads/'});

const mediaRouter = express.Router();

// Media resource endpoints
mediaRouter.route('/').get(getItems).post(upload.single('file'), postItem);

mediaRouter.route('/:id').get(getItemById).put(putItem).delete(deleteItem);

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