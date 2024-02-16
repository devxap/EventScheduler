const {verifyApprove, loginFaculty, registerFaculty } = require('../controllers/facultyController');

router.post('/registerFaculty',registerFaculty);
router.post('/loginFaculty',loginFaculty);
router.post('/verifyApprove',verifyApprove);
