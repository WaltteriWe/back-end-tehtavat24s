import promisePool from '../utils/database.js';

const selectUserById = async (id) => {
  try {
    const [rows] = await promisePool.query(
      'SELECT username, email, user_level_id FROM Users WHERE user_id = ?',
      [id],
    );
    return rows[0];
  } catch (error) {
    console.error('getUserBy id error', error.message);
    throw new Error('Database error ' + error.message);
  }
};

const selectUserByUsername = async (username) => {
  try {
    // TODO: return only user_id?
    const [rows] = await promisePool.query(
      'SELECT user_id, username, email, password, user_level_id, created_at FROM Users WHERE username = ?',
      [username],
    );
    return rows[0];
  } catch (error) {
    console.error('selectUserByUsernameAndPassword', error.message);
    throw new Error('Database error ' + error.message);
  }
};

/**
* Creates a new user in the database
* 
* @param {object} user data
* @returns {number} - id of the inserted user in db
*/
const addUser = async (user) => {
  try {
    const sql = `INSERT INTO Users (username, email, password, user_level_id)
                VALUES (?, ?, ?, ?)`;
    // user level id defaults to 2 (normal user)                 
    const params = [user.username, user.email, user.password, 2];
    const [result] = await promisePool.query(sql, params);
    return result[0].insertId;
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
}

export {selectUserByUsername, selectUserById, addUser};