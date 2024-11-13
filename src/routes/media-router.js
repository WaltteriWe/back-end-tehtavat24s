import express from 'express';
import {
  getItemById,
  getItems,
  postItem,
} from '../controllers/media-controller.js';

const mediaRouter = express.Router();

mediaRouter.get('/api', (req, res) => {
  res.render('index', {
    title: 'API Documentation',
    message: 'TODO: include docs here!',
    // exampleData: mediaItems,
  });
});

// Media resource endpoints
mediaRouter.route('/').get(getItems).post(postItem);

mediaRouter.route('/:id').get(getItemById);

mediaRouter.put('/:id', (req, res) => {
  // TODO: implement this endpoint
  res.status(501).json({message: 'Under construction'});
});

export default mediaRouter;
