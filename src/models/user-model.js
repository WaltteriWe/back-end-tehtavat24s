import promisePool from '../utils/database.js';

const selectUserById = async (id) => {
  try {
    const [rows] = await promisePool.query(
      'SELECT username, email, user_level_id FROM users WHERE user_id = ? ',
      [username, password],
    );
    return rows[0];
  } catch (e) {
    console.error('getUserById error', e.message);
    throw new Error('Database error ' + e.message);
  }
};

const selectUserByUsernameAndPassword = async (username, password) => {
  try {
    // TODO: return only user_id?
    const [rows] = await promisePool.query(
      'SELECT * FROM users WHERE username = ? AND password = ?',
      [username, password],
    );
    return rows[0];
  } catch (e) {
    console.error('selectUserByUsernameAndPassword', e.message);
    throw new Error('Database error ' + e.message);
  }
};

export {selectUserByUsernameAndPassword, selectUserById};
