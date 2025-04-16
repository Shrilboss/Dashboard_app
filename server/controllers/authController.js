import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import pool from '../db.js'; // your pg pool
const JWT_SECRET = process.env.JWT_SECRET;

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  try{
  const result = await pool.query(
    'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
    [name, email, hashed]
  ); 
  res.status(201).json({ user: result.rows[0] });
  } catch (err) {
    // Check for PostgreSQL unique violation error code
    if (err.code === '23505') {
      return res.status(400).json({ 
        error: "User already exists with given email id" 
      });
    }
    // Handle other errors
    res.status(500).json({ error: "Internal server error" });
  }

};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  const user = result.rows[0];
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1d' });
  res.json({ token, user });
};
