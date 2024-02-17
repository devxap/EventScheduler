const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
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
    rollNumber: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
    section: {
        type: String,
        required: true,
    },
    usertype: {
        type:String,
        required:true,
    },
    appointments: [
        {
            facultyName: {
                type: String,
                default: "",
            },
            dateOfAppointment: {
                type: Date,
                default: "",
            },
            timeOfAppointment: {
                type: String,
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

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
