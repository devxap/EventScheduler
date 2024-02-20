const { saveStudentData, loginStudent, registerStudent, getAllStudents, getStudentInfo, registerFaculty } = require('../controllers/studentController');

const router= require('express').Router();

router.post('/registerStudent',registerStudent);
router.post('/loginStudent',loginStudent);
router.post('/saveStudent/:id',saveStudentData);
router.get('/getAllStudents',getAllStudents)
router.get('/getStudentInfo',getStudentInfo)
router.post('/registerFaculty',registerFaculty);


module.exports=router;