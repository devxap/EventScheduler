const Faculty = require('../models/facultyModel');
const Student = require('../models/studentModel');


module.exports.verifyApprove = async (req, res, next) => {
    try {

        const { facultyName,
                name,
                rollNumber,
                username,
                year,
                section,
                dateOfAppointment,
                timeOfAppointment,
                approvalStatus,
                messageForAppointment } = req.body;

        if (!facultyName || !username || !dateOfAppointment || !timeOfAppointment) {
            return res.status(400).json({
                success: false,
                message: "Invalid request. Missing required fields.",
            });
        }

        const student = await Student.findOne({ username: username });

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found.",
            })
        }

        const appointment = student.appointments.find(
            (appointment) => appointment.facultyName === facultyName
                && appointment.dateOfAppointment === dateOfAppointment
                && appointment.timeOfAppointment === timeOfAppointment
        );

        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: 'Appointment not found for the given faculty and student.'
            })
        }

        if (approvalStatus === false) {
            appointment.approvalStatus = true;
        }
        else {
            appointment.approvalStatus = false;
        }

        await student.save();

        const faculty = await Faculty.findOne({ facultyName });

        if (!faculty) {
            res.status(404).json({
                success: false,
                message: "Faculty not found."
            })
        }

        const facultyData = {
            studentRollNumber: rollNumber,
            studentName: name,
            studentYear: year,
            studentSection: section,
            dateOfAppointment: dateOfAppointment,
            timeOfAppointment: timeOfAppointment,
            messageForAppointment: messageForAppointment,
            approvalStatus: appointment.approvalStatus,
        }

        faculty.students.push(facultyData);
        await faculty.save();

        res.status(200).json({
            success: true,
            message: 'Appointment verified and faculty data added to the students array successfully.',
        })

    } catch (error) {
        next(error);
    }
}