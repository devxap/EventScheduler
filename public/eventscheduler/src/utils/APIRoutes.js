export const host="http://localhost:5000";

export const studentRegisterRoute=`${host}/api/auth/registerStudent`;
export const studentLoginRoute=`${host}/api/auth/loginStudent`;
export const getAllStudentsRoute=`${host}/api/auth/getAllStudents`;
export const getStudentRoute=`${host}/api/auth/getStudent`;


export const facultyRegisterRoute=`${host}/api/auth/registerFaculty`;
export const facultyLoginRoute=`${host}/api/auth/loginFaculty`;

export const saveStudentDataRoute = `${host}/api/auth/saveStudent`;
export const updateApproval = `${host}/api/auth/updateApproval/:id`;

export const verifyApproveRoute = `${host}/api/auth/verifyApprove`;
