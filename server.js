import 'dotenv/config';
import express from 'express';
import cors from 'cors';
//import apiRoutes from './routes/api.js';

const app = express();
const PORT = process.env.PORT;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//database connect
import connectDB from './config/database.js';
connectDB();

//routes
app.get('/', (request, response) => {
  response.send('API is running');
});

// app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`your server is running on PORT ${PORT}`);
});
