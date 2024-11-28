import promisePool from '../utils/database.js';


// Fetch all media items
const fetchMediaItems = async () => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM MediaItems');
    return rows;
  } catch (e) {
    console.error('fetchMediaItems', e.message);
    throw new Error('Database error ' + e.message);
  }
};

// Fetch a specific media item by id
const fetchMediaItemById = async (id) => {
  try {
    const sql = 'SELECT * FROM MediaItems WHERE media_id = ?';
    const [rows] = await promisePool.query(sql, [id]);
    console.log('fetchMediaItemById', rows);
    return rows[0];
  } catch (e) {
    console.error('fetchMediaItemById', e.message);
    throw new Error('Database error ' + e.message);
  }
};

/**
 * Update a media item in the database
 * @param {number} id
 * @param {object} updatedItem
 * @returns {Promise<number>} number of affected rows
 */
const updateMediaItem = async (id, updatedItem) => {
  const sql = `UPDATE MediaItems SET title = ?, description = ? WHERE media_id = ?`;
  const params = [updatedItem.title, updatedItem.description, id];
  try {
    const result = await promisePool.query(sql, params);
    console.log('updateMediaItem', result);
    return result[0].affectedRows;
  } catch (error) {
    console.error('updateMediaItem', error.message);
    throw new Error('Database error ' + error.message);
  }
};

// Add a new media item
const addMediaItem = async (newItem) => {
  const sql =
    'insert into MediaItems (user_id, title, description, filename, filesize, media_type) values (?, ?, ?, ?, ?, ?)';
  const params = [
    newItem.user_id,
    newItem.title,
    newItem.description,
    newItem.filename,
    newItem.filesize,
    newItem.media_type,
  ];
  const result = await promisePool.query(sql, params);
  console.log('addMediaItem', result);
  return newItem.media_id;
};

// Delete a media item
const deleteMediaItem = async (id) => {
  try {
    const sql = 'DELETE FROM MediaItems WHERE media_id = ?';
    await promisePool.query(sql, [id]);
    return true;
  } catch (e) {
    console.error('deleteMediaItem', e.message);
    throw new Error('Database error ' + e.message);
  }
};

// Fetch all likes for a specific media item
const fetchLikesByMediaId = async (mediaId) => {
  try {
    const sql = 'SELECT * FROM Likes WHERE media_id = ?';
    const [rows] = await promisePool.query(sql, [mediaId]);
    return rows;
  } catch (e) {
    console.error('fetchLikesByMediaId', e.message);
    throw new Error('Database error ' + e.message);
  }
};

// Fetch all likes by a specific user
const fetchLikesByUserId = async (userId) => {
  try {
    const sql = 'SELECT * FROM Likes WHERE user_id = ?';
    const [rows] = await promisePool.query(sql, [userId]);
    return rows;
  } catch (e) {
    console.error('fetchLikesByUserId', e.message);
    throw new Error('Database error ' + e.message);
  }
};

// Add a new like
const addLike = async (mediaId, userId) => {
  try {
    const sql = 'INSERT INTO Likes (media_id, user_id) VALUES (?, ?)';
    const [result] = await promisePool.query(sql, [mediaId, userId]);
    return result.insertId;
  } catch (e) {
    console.error('addLike', e.message);
    throw new Error('Database error ' + e.message);
  }
};

// Remove a like
const deleteLike = async (likeId) => {
  try {
    const sql = 'DELETE FROM Likes WHERE like_id = ?';
    await promisePool.query(sql, [likeId]);
    return true;
  } catch (e) {
    console.error('deleteLike', e.message);
    throw new Error('Database error ' + e.message);
  }
};

export {fetchMediaItems, fetchMediaItemById, addMediaItem, fetchLikesByMediaId, fetchLikesByUserId, addLike, deleteLike, updateMediaItem, deleteMediaItem};
