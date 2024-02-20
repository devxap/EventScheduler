const { saveStudentData, loginStudent, registerStudent, getAllStudents, getStudentInfo, registerFaculty, updateApproval } = require('../controllers/studentController');

const router= require('express').Router();

router.post('/registerStudent',registerStudent);
router.post('/loginStudent',loginStudent);
router.post('/saveStudent/:id',saveStudentData);
router.get('/getAllStudents/:id',getAllStudents)
router.get('/getStudentInfo',getStudentInfo)
router.post('/registerFaculty',registerFaculty);
router.put('/updateApproval/:id',updateApproval);


module.exports=router;