require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const router = express.Router();


//allows request to go through

router.use(cors({
    origin: 'my-landholdings-dashboard.vercel.app'
  }));

// routes
const loginRoute = require('./auth.js');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api", (req, res) =>{
    res.send('My Land App Server');
});

app.use('/api/auth', loginRoute);

mongoose.connect(process.env.MONGO_URI).then(() => {

    app.listen(process.env.PORT, () => {
        console.log('listening')
    });
}).catch((error) =>{
    console.log(error)
});