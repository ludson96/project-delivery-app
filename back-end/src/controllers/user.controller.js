import { Request, Response } from 'express';


  const createUser = async (req, res) => {
    const token = await this._userService.login(req.body);
    if (!token) {
      return res.status(401)
        .json({ message: 'Incorrect email or password' });
    }
    return res.status(201).json({ token });
  };

  module.exports = {
    login,
  }