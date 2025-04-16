import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET;

const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'Missing token' });
  
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      res.status(403).json({ error: 'Invalid token' });
    }
  };
  
  export default authenticate;