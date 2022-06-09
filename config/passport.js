import 'dotenv/config';
import JwtStrategy from 'passport-jwt/lib/strategy';
import { ExtractJwt } from 'passport-jwt/lib';
import mongoose from 'mongoose';

const User = mongoose.model('users');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_OR_KEY;

export default (passport) => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then((user) => {
          if (user) return done(null, user);
          return done(null, false);
        })
        .catch((error) => console.log(error));
    })
  );
};
