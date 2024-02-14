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
    students: [
        {
            studentRollNumber: {
                type: String,
                required: true,
            },
            studentName: {
                type: String,
                required: true,
            },
            studentYear: {
                type: String,
                required: true,
            },
            studentSection: {
                type: String,
                required: true,
            },
            dateOfAppointment: {
                type: Date,
                required: true,
            },
            timeOfAppointment: {
                type: String,
                required: true,
            },
            messageForAppointment: {
                type: String,
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
