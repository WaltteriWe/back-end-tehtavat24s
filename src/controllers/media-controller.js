import {addMediaItem, fetchMediaItems} from '../models/media-model.js';
import {
  fetchLikesByMediaId,
  fetchLikesByUserId,
  addLike,
  // removeLike,
} from '../models/media-model.js';

const fetchMediaItemById = async (req, res) => {
  try {
    res.json(await fetchMediaItems());
  } catch (e) {
    console.error('getItems', e.message);
    res.status(503).json({error: 503, message: 'DB error'});
  }
};

const postItem = async (req, res) => {
  const {title, description} = req.body;
  if (!title || !description || !req.file) {
    return res
      .status(400)
      .json({message: 'Title, description and file required'});
  }
  console.log('post req body', req.body);
  console.log('post req file', req.file);
  const newMediaItem = {
    user_id: req.user.user_id,
    title,
    description,
    filename: req.file.filename,
    filesize: req.file.size,
    media_type: req.file.mimetype,
    created_at: new Date().toISOString(),
  };
  try {
    const id = await addMediaItem(newMediaItem);
    res.status(201).json({message: 'Item added', id: id});
  } catch (error) {
    return res
      .status(400)
      .json({message: 'Something went wrong: ' + error.message});
  }
};

const getItemById = async (req, res) => {
  const id = parseInt(req.params.id);
  console.log('getItemById', id);
  try {
    const item = await fetchMediaItemById(id);
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({message: 'Item not found'});
    }
  } catch (error) {
    console.error('getItemById', error.message);
    res.status(503).json({error: 503, message: error.message});
  }
};

// get all likes for a specific media item
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
// get all likes by a specific user
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

// add a like to a media item
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

// delete a like on a media item
const deleteLike = async (req, res) => {
  try {
    const likeId = parseInt(req.params.id);
    await deleteLike(likeId);
    res.status(200).json({message: 'Like deleted'});
  } catch (e) {
    console.error('removeLike', e.message);
    res.status(503).json({error: 503, message: 'DB error'});
  }
};

export {
  fetchMediaItemById,
  postItem,
  getItemById,
  getLikesByMediaId,
  getLikesByUserId,
  deleteLike,
  postLike,
};
