const Student = require("../models/studentModel");
const bcrypt = require('bcryptjs');

module.exports.saveStudentData = async (req, res, next) => {

  try {
        const userID=req.params.id;
        const {facultyName, dateOfAppointment, timeOfAppointment, messageForAppointment} = req.body;

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
        });

        await loggedinStudent.save();
        
        res.status(201).json({ success: true, message: "Data added to the student database" });

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
  
  module.exports.loginStudent= async(req,res,next)=>{
  try {
      const {username, password, usertype} = req.body;
      const user= await Student.findOne({username});
      if(!user){
          return res.json({msg:"Incorrect username or password!",status:false});
      }
      if(usertype!=="Student"){
        return res.json({msg:"Incorrect usertype!",status:false});
      }
      const isPasswordValid=await bcrypt.compare(password, user.password);
      if(!isPasswordValid){
          return res.json({msg:"Incorrect username or password!",status:false});
      }
      delete user.password;
      return res.json({status:true,user});
  } catch (error) {
      next(error);
  }
  }