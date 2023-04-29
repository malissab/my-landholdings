require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const path = require('path');

// routes
const routes = require('./auth.js');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'client/build')));
app.use('/api/auth', routes);

app.get("/api", (req, res) =>{
    res.send('My Land App Server');
});


mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`listening on ${process.env.PORT}`)
    });
}).catch((error) =>{
    console.log(error)
});