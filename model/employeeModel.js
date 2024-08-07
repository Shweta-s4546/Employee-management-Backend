const mongoose = require('mongoose')


const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        require:true,
        unique:true
    },
    mobile: {
        type: Number,
         required: true
    },
    gender: {
        type: String,
         required: true
    },
    designation: {
        type: String,
         required: true
    },
    course: [{
        type: String,
         required: true
    }],
    create_date: {
        type: String,
        default: new Date().toLocaleString()
    },
    image: {
        type: String,
       
    }
}, {
    collection: "employes",
    timestamps: true
})

module.exports = mongoose.model("Employees", employeeSchema)