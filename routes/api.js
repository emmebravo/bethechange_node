import express from 'express';
import usersRoutes from './users.js';
//import plaidRoutes from './plaid.js'

const router = express.Router();

router.use('/users', usersRoutes);
// router.use('/plaid', plaidRoutes);

export default router;
