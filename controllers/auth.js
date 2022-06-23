import 'dotenv/config';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import validateRegister from '../validation/register.js';
import validateLogin from '../validation/login.js';

exports.postRegister = (request, response) => {
  const { errors, isValid } = validateRegister;
  const { name, email, password } = request.body;

  // check validation
  if (!isValid) return response.status(400).json(errors);

  User.findOne({ email: email }).then((user) => {
    if (user)
      return response.status(400).json({ email: 'Email already exists' });
    else {
      const newUser = new User({
        name,
        email,
        password,
      });

      // hash password with bcrypt
      bcrypt.genSalt(10, (error, salt) => {
        bcrypt.hash(newUser.password, salt, (error, hash) => {
          if (error) throw error;

          // set password to hash
          newUser.password = hash;

          // save new User
          newUser
            .save()
            .then((user) => response.json(user))
            .catch((error) => console.log(error));
        });
      });
    }
  });
};

exports.postLogin = (request, response) => {};
