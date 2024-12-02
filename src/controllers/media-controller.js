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
const postItem = async (req, res) => {
  console.log('post req body', req.body);
  const {title, description} = req.body;
  if (!title || !description) {
    return res
      .status(400)
      .json({message: 'Title and description are required'});
  }
  console.log('post req file', req.file);
  const newMediaItem = {
    user_id: 1,
    title,
    description,
    filename: req.file.filename,
    filesize: req.file.size,
    media_type: req.file.mimetype,
  };
  try {
    const id = await addMediaItem(newMediaItem);
    console.log(id);
    res.status(201).json({message: 'Item added', id: id});
  } catch (e) {
    console.error('postItem', e.message);
    res.status(503).json({error: 503, message: 'DB error'});
  }
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
    const itemsEdited = await updateMediaItem(req.params.id, newDetails);
    // if no items were edited (id was not found in DB), return 404
    if (itemsEdited === 0) {
      return res.status(404).json({message: 'Item not found'});
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
    const deleted = await deleteMediaItem(id);
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