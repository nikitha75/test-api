const mongoose = require("mongoose");

const connectDB = () => {
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then((conn) => {
        console.log(`Connected to database: ${conn.connection.host}`)
    })
    .catch((err) => {
        console.log("Failed to connect to database");
        console.log(err.message);
        process.exit(1);
    });
};

module.exports = connectDB;