

module.exports.saveStudentData = async (req, res, next) => {

    try {
        
        const loggedInUsername = req.session.username;

        isLoggedIn(req, res, async () => {
          const { data } = req.body;
          })
    
          const loggedinStudent = await Student.findOne({ username: loggedInUsername });
    
          if (!loggedinStudent) {
            return res.status(404).json({
              success: false,
              message: 'Logged-in student not found.',
            });
          }

        
            loggedinStudent.appointments.push(
                {
                    facultyName: data.facultyName,
                    dateOfAppointment: data.dateOfAppointment,
                    timeOfAppointment: data.timeOfAppointment,
                    approvalStatus: data.approvalStatus,
                    messageForAppointment: data.messageForAppointment,
                }
            )

        await loggedinStudent.save();

        res.status(201).json({success:true, message:"Data added to the student database"});

    } catch (error) {
        next(error);
    }



}