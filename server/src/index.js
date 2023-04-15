const express = require('express');
const upload = require('express-fileupload');
const app = express();
const { HOST, SERVER_PORT, CLIENT_PORT } = require('./constants');
const cookieParser = require('cookie-parser')
const passport = require('passport');
const cors = require('cors');

//Passport middleware
require('./middlewares/passport')

//Innitialize middleware
app.use(express.json());
app.use(upload());
app.use(cookieParser())
app.use(cors({ origin: `http://${HOST}:${CLIENT_PORT}`, credentials: true }))
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
        app.listen(SERVER_PORT, () => {
            console.log('listening on port ' + SERVER_PORT);
        });
    } catch (error) {
        console.error('Error:', error.message);
    }
};
startServer();