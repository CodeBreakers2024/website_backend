// To connect with your mongoDB database 

const mongoose = require("mongoose");
// mongodb+srv://codebreakersclub:Code**Breakers@codebreakersdatabase.9egqsy8.mongodb.net/?retryWrites=true&w=majority
const connectToMongo = async () => {
    await mongoose.connect(
        "mongodb://127.0.0.1:27017/tcb",
    ).then(()=>{
        console.log("Connection Successful")
    }).catch((err)=>{
        console.log(err)
    });
}

module.exports = connectToMongo