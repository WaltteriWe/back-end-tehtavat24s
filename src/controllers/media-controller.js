import {addMediaItem, fetchMediaItems} from '../models/media-model.js';

const getItems = (req, res) => {
  res.json(fetchMediaItems());
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

export {getItems, postItem, getItemById};
