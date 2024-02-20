const Faculty = require("../models/facultyModel");
const Student = require("../models/studentModel");
const bcrypt = require('bcryptjs');

module.exports.saveStudentData = async (req, res, next) => {

  try {
        const userID=req.params.id;
        const {facultyName, dateOfAppointment, timeOfAppointment, messageForAppointment, approvalStatus} = req.body;

        const loggedinStudent = await Student.findById(userID);
        
        if (!loggedinStudent) {
            return res.status(404).json({
                success: false,
                message: 'Logged-in student not found.',
            });
        }

        loggedinStudent.appointments.push({
            facultyName,
            dateOfAppointment,
            timeOfAppointment,
            messageForAppointment,
            approvalStatus,
        });

        await loggedinStudent.save();
        
        res.status(201).json({ success: true, message: "Data added to the student database" });

  } catch (error) {
      next(error);
  }
}

module.exports.updateApproval = async (req, res, next) => {
    try {
        const userID = req.params.id;
        const { approvalStatus, studentId } = req.body;

        await Faculty.findOneAndUpdate(
            { 'students._id': studentId },
            { $set: { 'students.$.approvalStatus': approvalStatus } },
            {
                new: true,
                runValidators: true,
                useFindAndModify: false,
            }
        );

        res.status(200).json({ success: true, message: "Approval Updated to the student database" });
    } catch (error) {
        next(error);
    }
};



module.exports.registerStudent=async (req,res,next)=>{
  try {
      const {username, email, password, name, section, rollNumber, year, usertype} = req.body;
      const userNameCheck=await Student.findOne({username});
      if(userNameCheck){
          return res.json({msg:"Username already used!", status:false});
      }
      const emailCheck=await Student.findOne({email});
      if(emailCheck){
          return res.json({msg:"Email already used!", status:false});
      }
  
      const hashedPassword=await bcrypt.hash(password,10);
      const user = await Student.create({
          email,
          username,
          password:hashedPassword,
          name,
          section,
          rollNumber,
          year,
          usertype,
      })
  
      delete user.password;
      return res.json({status:true, user});
  } catch (error) {
      next(error);
  }
  };
  
  module.exports.loginStudent = async (req, res, next) => {
      try {
          const { username, password } = req.body;
          let user = await Student.findOne({ username });
  
          if (!user) {
              user = await Faculty.findOne({ username });
  
              if (!user) {
                  return res.json({ msg: "Incorrect username or password!", status: false });
              }
          }
  
          const isPasswordValid = await bcrypt.compare(password, user.password);
  
          if (!isPasswordValid) {
              return res.json({ msg: "Incorrect username or password!", status: false });
          }
  
          try {
              if (user.usertype === 'Faculty') {
                  const data = await Student.find({ 'appointments.facultyName': user.name });
  
                  for (const item of data) {
                    console.log(`Data Item loginStudent/beforearraypush: ${item}`);
                      const existingStudent = user.students.find(student => (student.dateOfAppointment === item.appointments.dateOfAppointment && student.studentName===item.name));
  
                      if (existingStudent) {
                              user.students.push({
                                  studentRollNumber: item.rollNumber,
                                  studentName: item.name,
                                  studentUsername: item.username,
                                  studentYear: item.year,
                                  studentSection: item.section,
                                  dateOfAppointment: (item.appointments.find(student => student.facultyName === user.name && student.dateOfAppointment) || {}).dateOfAppointment,
                                  timeOfAppointment: (item.appointments.find(student => student.facultyName === user.name && student.timeOfAppointment) || {}).timeOfAppointment,
                                  messageForAppointment: (item.appointments.find(student => student.facultyName === user.name && student.messageForAppointment) || {}).messageForAppointment,
                                  approvalStatus: (item.appointments.find(student => student.facultyName === user.name && student.approvalStatus) || {}).approvalStatus,
                              });
                      } else if(!existingStudent) {
                        console.log(`Data Item loginStudent/justbeforearraypush: ${item}`);
                        console.log(`Data Item ROLL NUMBER loginStudent/justbeforearraypush: ${item.rollNumber}`);
                        
                        console.log(`User Item loginStudent/justbeforearraypush: ${user.students}`);
                          user.students.push({
                              studentRollNumber: item.rollNumber,
                              studentName: item.name,
                              studentUsername: item.username,
                              studentYear: item.year,
                              studentSection: item.section,
                              dateOfAppointment: (item.appointments.find(student => student.facultyName === user.name && student.dateOfAppointment) || {}).dateOfAppointment,
                              timeOfAppointment: (item.appointments.find(student => student.facultyName === user.name && student.timeOfAppointment) || {}).timeOfAppointment,
                              messageForAppointment: (item.appointments.find(student => student.facultyName === user.name && student.messageForAppointment) || {}).messageForAppointment,
                              approvalStatus: (item.appointments.find(student => student.facultyName === user.name && student.approvalStatus) || {}).approvalStatus,
                          });
                          console.log(`User Item loginStudent/justafterarraypush: ${user.students}`);

                      }
                      else{
                        user.students.push({});
                      }
                  }
  
                  await user.save();
                  console.log(`Saved User Cred/loginStudent/arraypush: ${user.username} ${username} ${password}`);
                  console.log(`Saved User/loginStudent/arraypush: ${user}`);
              }
          } catch (error) {
              console.log(`studentController/studentlogin/arraypush-->${error}`);
              return res.json({ msg: "Error processing data", status: false });
          }
  
          delete user.password;
          return res.json({ status: true, user });
  
      } catch (error) {
          next(`error-->loginStudent(backend):${error}`);
      }
  };
  


  module.exports.xloginStudent = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        let user = await Student.findOne({ username });

        if (!user) {
            user = await Faculty.findOne({ username });

            if (!user) {
                return res.json({ msg: "Incorrect username or password!", status: false });
            }
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.json({ msg: "Incorrect username or password!", status: false });
        }

        if (user.usertype === 'Faculty') {
            try {
                const studentAppointments = await Student.find();

                studentAppointments.forEach((student) => {
                    const relevantAppointments = student.appointments.filter(appointment => appointment.facultyName === user.name);
                    console.log(relevantAppointments);
                    console.log(user);


                    relevantAppointments.forEach(appointment => {
                        const existingEntry = user.students.find(entry => entry.dateOfAppointment === appointment.dateOfAppointment);
                        console.log(`existingEntry:${existingEntry}`);

                        if (!existingEntry && appointment.facultyName===user.name) {
                            user.students.push({
                                studentRollNumber: student.rollNumber,
                                studentName: student.name,
                                studentUsername: student.username,
                                studentYear: student.year,
                                studentSection: student.section,
                                dateOfAppointment: appointment.dateOfAppointment,
                                timeOfAppointment: appointment.timeOfAppointment,
                                messageForAppointment: appointment.messageForAppointment,
                                approvalStatus: appointment.approvalStatus,
                            });
                        } else {
                            console.log(`Entry for student ${student.username} with date ${appointment.dateOfAppointment} already exists.`);
                        }
                    });
                });

            } catch (error) {
                console.log(`studentController/studentlogin/arraypush-->${error}`);
            }

            await user.save();
        }

        delete user.password;
        return res.json({ status: true, user });

    } catch (error) {
        console.error(error);
        next(error);
    }
};


module.exports.getAllStudents = async (req, res, next) => {
    try {
      const facultyId = req.params.id;
  
      // Find the faculty with the given ID
      const faculty = await Faculty.findById(facultyId);
  
      if (!faculty) {
        return res.status(404).json({
          success: false,
          message: 'Faculty not found.',
        });
      }
  
      // Extract the list of student usernames associated with the faculty
      const studentUsernames = faculty.students.map(student => student.studentUsername);
  
      // Find and return the details of the students based on usernames
      const students = await Student.find({ username: { $in: studentUsernames } });
  
      return res.json({
        status: true,
        students,   
      });
    } catch (error) {
      next(error);
    }
  };
  

  module.exports.getStudentInfo = async(req,res,next)=>{
    try {
        const student = await Student.findById(req.user.id);
        res.status(200).json({
            success: true,
            student,
          });
    } catch (error) {
        next(error)
    }
  }


  module.exports.registerFaculty=async (req,res,next)=>{
    try {
        const {name, username, email, password, usertype} = req.body;
        const userNameCheck=await Faculty.findOne({username});
        if(userNameCheck){
            return res.json({msg:"Username already used!", status:false});
        }
        const emailCheck=await Faculty.findOne({email});
        if(emailCheck){
            return res.json({msg:"Email already used!", status:false});
        }
    
        const hashedPassword=await bcrypt.hash(password,10);
        const user = await Faculty.create({
            name,
            email,
            username,
            password:hashedPassword,
            usertype,
        })
    
        delete user.password;
        return res.json({status:true, user});
    } catch (error) {
        console.error(error); // Log the error
        next(error);    }
    };