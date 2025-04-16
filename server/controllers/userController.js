// server/controllers/userController.js
import * as UserModel from '../models/userModel.js';

export const getUsers = async (req, res) => {
  try {
    const users = await UserModel.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await UserModel.createUser({ name, email, password });
    res.status(201).json(user);
  } catch (err) {
    // console.log(err,err.code);
    if (err.code === '23505') {
      return res.status(400).json({ error: "User already exists with given email id" });
    }
    res.status(500).json({ error: err.message });
  }
};

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;
  
    try {
      const updatedUser = await UserModel.updateUser(id, { name, email, password });
      res.status(200).json(updatedUser);
    } catch (err) {
      // console.log(err,err.code);
      if (err.code === '23505') {
        return res.status(400).json({ error: "User already exists with given email id" });
      }
      res.status(500).json({ error: "Internal server error" });
    }
  };

  export const deleteUser = async (req, res) => {
    const { id } = req.params;
  
    try {
      await UserModel.deleteUser(id);
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
