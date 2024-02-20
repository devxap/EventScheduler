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
          const userID=req.params.id;
          const {approvalStatus} = req.body;
  
          await Student.findByIdAndUpdate(
            userID,
            { approvalStatus },
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
  }


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

        if (user.usertype === 'Faculty') {
            const students = await Student.find({ 'appointments.facultyName': user.name });
            console.log(students);

            try {
                students.forEach(student => {
                    user.students.push({
                        studentRollNumber: student.rollNumber,
                        studentName: student.name,
                        studentUserame: student.username,
                        studentYear: student.year,
                        studentSection: student.section,
                        dateOfAppointment: student.appointments.dateOfAppointment,
                        timeOfAppointment: student.appointments.timeOfAppointment,
                        messageForAppointment: student.appointments.messageForAppointment,
                        approvalStatus: student.appointments.approvalStatus,
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



  module.exports.getAllStudents = async(req,res,next)=>{
    try {
        const students=await Student.find();
        return res.json({status:true,students});
    } catch (error) {
        next(error);
    }
  }

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