const mongoose  = require('mongoose')

const connectDb = async () =>{
    await mongoose.connect(process.env.MONGO_URL)
    .then(res =>{
        console.log(`Mongo connected succefully`)

    }).catch(err => console.log(err.message))
}

module.exports = connectDb