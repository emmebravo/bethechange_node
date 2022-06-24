import 'dotenv/config';
import validateRegister from '../validation/register.js';
import validateLogin from '../validation/login.js';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export function postRegister(request, response) {
  // const { errors, isValid } = validateRegister;
  const { name, email, password } = request.body;

  // check validation
  // if (!isValid) return response.status(400).json(errors);

  console.log(request.body);

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

  //response.send("you're at register");
}

export function postLogin(request, response) {
  const { errors, isValid } = validateLogin;

  //Check validation
  if (!isValid) return response.status(400).json(errors);

  const { email, password } = request.body;

  // find user by email
  User.findOne({ email }).then((user) => {
    // check if user exists
    if (!user)
      return response.status(400).json({ emailnotfound: 'Email not found' });
  });

  // check password matches with encrypted one
  bcrypt.compare(password, user.password).then((isMatch) => {
    if (isMatch) {
      // user matched, create JWT payload
      const payload = {
        id: user.id,
        name: user.name,
      };

      // sign token
      jwt.sign(
        payload,
        process.env.SECRET_OR_KEY,
        {
          expiresIn: 86400,
        },
        (error, token) => {
          response.json({ success: true, token: 'Bearer ' + token });
        }
      );
    } else {
      return response
        .status(400)
        .json({ passowrdincorrect: 'Password incorrect' });
    }
  });
}
