
import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import { routes } from './routes/routes'


const app = express();
const PORT = 3020;
const MongoDB_URI = `mongodb://localhost:27017/movie-lobby`


// Middleware
app.use(bodyParser.json());

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Error handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong! : server crashed');
});

app.use('/api', routes)

// Connecting to MongoDB
mongoose.connect(MongoDB_URI)
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit with non-zero code to indicate failure
  });
mongoose.connection.on('connected', () => {
  console.info(`@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@`)
  console.info(` Data Base connection successful. `)
  console.info(`@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@`)
});

mongoose.connection.on('error', (err) => {
  console.info(`***********************************`)
  console.info(` Failed to connect MongoDB. ${err} `)
  console.info(`*************************************`)
});

app.listen(PORT, () => {
  console.info(`############################################`)
  console.info(` Server is running on ${PORT} successfully. `)
  console.info(`############################################`)
});

export default app;

