const studentService = require('./students.service');

const getStudentData = async (req, res, next) => {
    try {
        const token = req.body;
        
    } catch (error) {
        next(error)
    }
}