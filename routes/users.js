import express from 'express';
import * as authController from '../controllers/auth.js';
const router = express.Router();

// @route POST api/users/register
// @desc Register user
// @access Public
router.post('/register', authController.postRegister);

// @route POST api/users/login
// @desc Login user and return jwt token
// @access Public
router.post('/login', authController.postLogin);

export default router;
