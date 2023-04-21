require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

// routes
const loginRoute = require('./auth.js');

const app = express();
app.use(express.json());
app.use(express.urlencoded());

app.get("/api", (req, res) =>{
    res.send('My Land App Server');
});

app.use('/api/auth', loginRoute);

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('db is connected!')

    app.listen(process.env.PORT, () => {
        console.log(`Server up on port ${process.env.PORT}`);
    });
}).catch((error) =>{
    console.log(error);
});