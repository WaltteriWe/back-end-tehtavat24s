import { validationResult } from 'express-validator';
import {
  addMediaItem,
  fetchMediaItems,
  fetchMediaItemById,
  fetchLikesByMediaId,
  fetchLikesByUserId,
  addLike,
  deleteLike,
  updateMediaItem,
  deleteMediaItem,
} from '../models/media-model.js';

// Get all media items
const getItems = async (req, res) => {
  try {
    res.json(await fetchMediaItems());
  } catch (e) {
    console.error('getItems', e.message);
    res.status(503).json({error: 503, message: 'DB error'});
  }
};

// Add a new media item
const postItem = async (req, res, next) => {
  // check if file is rejected by multer
  if (!req.file) {
    const error = new Error('Invalid or missing file');
    error.status = 400;
    next(error);
  }
  const errors = validationResult(req);
  // check if any validation errors
  if (!errors.isEmpty()) {
    console.log('postMedia errors', errors.array());
    const error = new Error('Invalid or missing fields');
    error.status = 400;
    return next(error);
  }
  const {title, description} = req.body;
  const {filename, mimetype, size} = req.file;
  // req.user is added by authenticateToken middleware
  const user_id = req.user.user_id;
  const newMedia = {title, description, user_id, filename, mimetype, size};
  const result = await addMediaItem(newMedia);
  if (result.error) {
    return next(new Error(result.error));
  }
  res.status(201).json({message: 'New media item added.', ...result});
};

// Get a media item by ID
const getItemById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const item = await fetchMediaItemById(id);
    if (item) {
      if (req.query.format === 'plain') {
        res.send(item.title);
      } else {
        res.json(item);
      }
    } else {
      res.status(404).json({message: 'Item not found'});
    }
  } catch (e) {
    console.error('getItemById', e.message);
    res.status(503).json({error: 503, message: 'DB error'});
  }
};

// Get all likes for a specific media item
const getLikesByMediaId = async (req, res) => {
  try {
    const mediaId = parseInt(req.params.id);
    const likes = await fetchLikesByMediaId(mediaId);
    res.json(likes);
  } catch (e) {
    console.error('getLikesByMediaId', e.message);
    res.status(503).json({error: 503, message: 'DB error'});
  }
};

// Get all likes by a specific user
const getLikesByUserId = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const likes = await fetchLikesByUserId(userId);
    res.json(likes);
  } catch (e) {
    console.error('getLikesByUserId', e.message);
    res.status(503).json({error: 503, message: 'DB error'});
  }
};

// Add a like to a media item
const postLike = async (req, res) => {
  try {
    const {mediaId, userId} = req.body;
    const likeId = await addLike(mediaId, userId);
    res.status(201).json({message: 'Like added', likeId});
  } catch (e) {
    console.error('postLike', e.message);
    res.status(503).json({error: 503, message: 'DB error'});
  }
};

// Delete a like on a media item
const removeLike = async (req, res) => {
  try {
    const likeId = parseInt(req.params.id);
    await deleteLike(likeId);
    res.status(200).json({message: 'Like deleted'});
  } catch (e) {
    console.error('removeLike', e.message);
    res.status(503).json({error: 503, message: 'DB error'});
  }
};

/**
 * Update media file Controller function for handling PUT request and sending response
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
 * @returns {object} response object
 */
const putItem = async (req, res) => {
  // destructure title and description property values from req.body
  const {title, description} = req.body;
  console.log('put req body', req.body);
  const newDetails = {
    title,
    description,
  };
  try {
    const itemsEdited = await updateMediaItem(req.params.id, newDetails, req.user.user_id);
    // if no items were edited (id was not found in DB), return 404
    if (itemsEdited === 0) {
      return res.status(404).json({message: 'Item not found or unauthorized'});
    } else if (itemsEdited === 1) {
      return res.status(200).json({message: 'Item updated', id: req.params.id});
    }
  } catch (error) {
    return res
      .status(500)
      .json({message: 'Something went wrong: ' + error.message});
  }
};

// delete a media item
const deleteItem = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const deleted = await deleteMediaItem(id, req.user.user_id);
    if (deleted) {
      res.status(200).json({message: 'Item deleted', status: 200});
    } else {
      res.status(404).json({message: 'Item not found'});
    }
  } catch (e) {
    console.error('deleteItem', e.message);
    res.status(503).json({error: 503, message: 'DB error'});
  }
};

export {
  getItems,
  postItem,
  getItemById,
  getLikesByMediaId,
  getLikesByUserId,
  postLike,
  removeLike,
  putItem,
  deleteItem,
};