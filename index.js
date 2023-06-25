require("dotenv").config();
const express = require("express");
const app = express();

const connectDB = require("./config/database");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");




connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use("/api", userRoutes);



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
});





module.exports = app;