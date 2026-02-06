import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import connectDB from './db/db.js';
import router from './routes/route.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', router);

app.get('/', (req, res) => {
  res.send('Backend Running');
});
// console.log(process.env.DB_USERNAME,process.env.DB_PASSWORD)
connectDB(process.env.DB_USERNAME,process.env.DB_PASSWORD);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
