// server/models/userModel.js
import pool from '../db.js';
import bcrypt from 'bcrypt';

export const getAllUsers = async () => {
  const res = await pool.query('SELECT * FROM users');
  return res.rows;
};

export const createUser = async ({ name, email, password }) => {
  const hashed = await bcrypt.hash(password, 10);
  try{
    const res = await pool.query(
      'INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING *',
      [name, email, hashed]
    );
    return res.rows[0];
  } catch(err){
    console.log(err);
    throw err;
  }
};


export const updateUser = async (id, { name, email, password }) => {
  try {
    const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

    // Build query dynamically
    let query = 'UPDATE users SET name = $1, email = $2';
    const values = [name, email];

    // Add password if provided
    if (hashedPassword) {
      query += ', password = $3';
      values.push(hashedPassword);
    }

    // Add WHERE clause with correct parameter index
    query += ` WHERE id = $${values.length + 1} RETURNING *`;
    values.push(id);

    const res = await pool.query(query, values);
    return res.rows[0];
  } catch (err) {
    console.error(err); // Log errors for debugging
    throw err;
  }
};
  
export const deleteUser = async (id) => {
    await pool.query('DELETE FROM users WHERE id = $1', [id]);
};