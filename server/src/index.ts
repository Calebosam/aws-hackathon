import express from 'express';
import upload from 'express-fileupload';
import constants from './constants';
import cookieParser from 'cookie-parser'
import passport from 'passport';
import cors from 'cors';


const app = express();
//Passport middleware
require('./middlewares/passport')

//Innitialize middleware
app.use(express.json());
app.use(upload());
app.use(cookieParser())
app.use(cors({ origin: `http://${constants.HOST}:${constants.CLIENT_PORT}`, credentials: true }))
app.use(passport.initialize());

//Import routes from routes folder
const authRoutes = require('./routes/authentication');
const docRoutes = require('./routes/documents');

//Initialize routes
app.use('/api', authRoutes)
app.use('/api', docRoutes);

// Start server
const startServer = () => {
    try {
      app.listen(constants.SERVER_PORT, () => {
        console.log("listening on port " + constants.SERVER_PORT);
      });
    } catch (error) {
      console.error("Error:", error.message);
    }
};

export default startServer;