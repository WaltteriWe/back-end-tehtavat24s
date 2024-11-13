import promisePool from '../utils/database';

const fetchMediaItems = async () => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM MediaItems');
    return rows;
  } catch (e) {
    console.error('fetchMediaItems', e.message);
    throw new Error('Database error ' + e.message);
  }
};

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
const addMediaItem = async (newItem) => {
  const sql =
    'insert into MediaItems (title, description, filename, filesize, media_type, created_at) values (?, ?, ?, ?, ?)';
  const params = [
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

export {fetchMediaItems, fetchMediaItemById, addMediaItem};
