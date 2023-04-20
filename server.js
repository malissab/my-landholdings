require("dotenv").config();
const express = require("express");

const app = express();
app.use(express.json());
app.use(express.urlencoded());

app.get("/", (req, res) =>{
    res.send('My Land App Server');
});

app.post("/posted", (req, res) => {
    if(req.body.name){
        return res.json({name: req.body.name})
    } else {
        return res.status(400).json({error: 'not posted'})
    }
})

app.listen(process.env.PORT, () => {
    console.log(`Server up on port ${process.env.PORT}`);
});