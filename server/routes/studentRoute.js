const { saveStudentData, loginStudent, registerStudent } = require('../controllers/studentController');

const router= require('express').Router();

router.post('/registerStudent',registerStudent);
router.post('/loginStudent',loginStudent);
router.post('/saveStudent/:id',saveStudentData);

module.exports=router;