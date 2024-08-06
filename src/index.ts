// Import express, cors, helmet and morgan
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import bodyParser from "body-parser";
import multer from "multer";
import router from './routes';

// Create Express server
dotenv.config();
const app = express(); // New express instance

// Express configuration
app.use(cors()); // Enable CORS
app.use(helmet()); // Enable Helmet
app.use(morgan('dev')); // Enable Morgan
app.use(express.json()); // <=== Enable JSON body parser
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }))
// Store uploaded files in memory
const storage = multer.memoryStorage();

// Use routes
app.use('/api', router);

// Start Express server
app.listen(process.env.PORT, () => {
  // Callback function when server is successfully started
  console.log(`Server started at http://localhost:${process.env.PORT}`);
});

// Export Express app
export default app;