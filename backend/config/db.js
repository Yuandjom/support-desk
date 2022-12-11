//bring in mongoose
const mongoose = require('mongoose')

//function 
const connectDB = async() => {
    try {
        //establish a connect and return a promise 
        const conn = await mongoose.connect(process.env.MONGO_URI)
        //give the mongoDB host that we are connected to 
        //the colors package allow for cyan.underline
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
    } catch (error) {
        console.log(`Error: ${error.message}`.red.underline.bold)
        process.exit(1)
    }
}

//exporting the connectDB function 
module.exports = connectDB