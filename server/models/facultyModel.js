const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        reuired: true,
    },
    email: {
        type: String,
        required: true,
    },
    facultyName: {
        type: String,
        required: true,
    },
    userType: {
        type:String,
        required:true,
    },
    students: [
        {
            studentRollNumber: {
                type: String,
                required: true,
                default: "",
                
            },
            studentName: {
                type: String,
                required: true,
                default: "",
                
            },
            studentYear: {
                type: String,
                required: true,
                default: "",
                
            },
            studentSection: {
                type: String,
                required: true,
                default: "",
                
            },
            dateOfAppointment: {
                type: Date,
                required: true,
                default: "",
                
            },
            timeOfAppointment: {
                type: String,
                required: true,
                default: "",
                
            },
            messageForAppointment: {
                type: String,
                default: "",
            },
            approvalStatus: {
                type: Boolean,
                default: false,
            },
        },
    ],
});

const Faculty = mongoose.model('Faculty', facultySchema);

module.exports = Faculty;
