import express from 'express';

const router = express.Router();

// @route POST api/users/register
// @desc Register user
// @access Public
router.post('/register', authController.register);

// @route POST api/users/login
// @desc Login user and return
// @access Public
router.post('/login', authController.login);

module.exports = router;
