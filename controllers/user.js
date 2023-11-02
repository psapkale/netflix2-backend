import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.js';
import ErrorHandler from '../middlewares/error.js';
import { setCookie } from '../utils/features.js';

export const register = async (req, res, next) => {
   try {
      const { name, email, password } = req.body;
      let user = await User.findOne({ email });

      if (user) return next(new ErrorHandler('User alrady exists', 400));

      const hashedPassword = await bcrypt.hash(password, 10);
      user = await User.create({ name, email, password: hashedPassword });

      setCookie(user, res, 'Registered Successfully', 201);
   } catch (error) {
      next(error);
   }
};

export const login = async (req, res, next) => {
   try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user)
         return next(new ErrorHandler('Invalid email or password'), 400);

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch)
         return next(new ErrorHandler('Invalid email or password'), 400);

      setCookie(user, res, `Welcome back ${user?.name}`, 200);
   } catch (error) {
      next(error);
   }
};

export const logout = (req, res, next) => {
   res.status(200)
      .cookie('token', '', {
         expires: new Date(Date.now()),
         sameSite: process.env.NODE_ENV === 'Development' ? 'lax' : 'none',
         secure: process.env.NODE_ENV === 'Development' ? false : true,
      })
      .json({
         success: true,
      });
};

export const getProfile = (req, res, next) => {
   res.status(200).json({
      success: true,
      user: req.user,
   });
};
