import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import passport from 'passport';
import passportConfig from './config/passport.js';
import apiRoutes from './routes/api.js';

const app = express();
const PORT = process.env.PORT;

// database connect
import connectDB from './config/database.js';
connectDB();

// passport config
passportConfig(passport);

// express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// passport middleware
app.use(passport.initialize());

// routes
app.get('/', (request, response) => {
  response.send('API is running');
});

app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`your server is running on PORT ${PORT}`);
});
