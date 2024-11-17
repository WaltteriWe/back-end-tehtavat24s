import {addMediaItem, fetchMediaItems} from '../models/media-model.js';
import {
  fetchLikesByMediaId,
  fetchLikesByUserId,
  addLike,
  // removeLike,
} from '../models/media-model.js';

const getItems = async (req, res) => {
  try {
    res.json(await fetchMediaItems());
  } catch (e) {
    console.error('getItems', e.message);
    res.status(503).json({error: 503, message: 'DB error'});
  }
};

const postItem = (req, res) => {
  console.log('post req body', req.body);
  const id = addMediaItem(req.body);
  console.log(id);
  // console.log(req.body);
  res.status(201).json({message: 'Item added', id: id});
};

const getItemById = (req, res) => {
  const id = parseInt(req.params.id);
  const mediaItems = fetchMediaItems();
  const item = mediaItems.find((item) => item.media_id === id);
  if (item) {
    if (req.query.format === 'plain') {
      res.send(item.title);
    } else {
      res.json(item);
    }
  } else {
    res.status(404).json({message: 'Item not found'});
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
    }
    catch (e) {
      console.error('getLikesByUserId', e.message);
      res.status(503).json({error: 503, message: 'DB error'});
    }
};

// add a like to a media item
const postLike = async (req, res) => {
  try {
    const { mediaId, userId } = req.body;
    const likeId = await addLike(mediaId, userId);
    res.status(201).json({ message: 'Like added', likeId });
  } catch (e) {
    console.error('postLike', e.message);
    res.status(503).json({ error: 503, message: 'DB error' });
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

export {getItems, postItem, getItemById, getLikesByMediaId, getLikesByUserId, deleteLike, postLike};
