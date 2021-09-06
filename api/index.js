const dotenv = require("dotenv");

const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
//routes
const authRoute = require('./src/routes/auth.route');
const userRoute = require('./src/routes/user.route');
const messengerRouter = require('./src/routes/messenger.route')
//middlewares
const authMiddleware = require('./src/middlewares/auth.middleware');

dotenv.config();
const port = 8800;
//connect mongoDB
mongoose.connect(
    process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
      console.log("Connected to MongoDB");
    }
  );

//Set up back end server
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello Worlddd')
});
app.use('/auth', authRoute)
//use routes
app.use('/users', authMiddleware.isAuth, userRoute);
app.use('/messenger', authMiddleware.isAuth, messengerRouter)
app.listen(port);
