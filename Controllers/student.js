const Tutor = require('../Models/Tutor');
const Student = require('../Models/Student');
const Course = require('../Models/Course');

const mongoose = require('mongoose');
const Assignment = require('../Models/Assignment');


exports.getAllCourses = async (req, res, next) => {
    try {
        const userId = res.locals.userDetails.id;

        const stud = await Student.findOne({ firebaseKey: userId })

        if (stud) {
            const courses = await Course.find();
            return res.status(200).json({
                courses: courses
            })
        }


        return res.status(203).json({
            message: "Resource not found!"
        })


    } catch (err) {
        console.log(err);
    }
};


exports.getEnrolledCourses = async (req, res, next) => {
    try {
        const userId = res.locals.userDetails.id;
        console.log("email"+res.locals.userDetails.email)

        const stud = await Student.findOne({ firebaseKey: userId });
        
        if (stud) {
            const item = (stud._id);
            const courses = await Course.find({ "studentsEnrolled.studentId" : item });
           
            return res.status(200).json({
                courses: courses
            })
        }

        return res.status(203).json({
            message: "Resource not found!"
        })


    } catch (err) {
        console.log(err);
    }
};


exports.getCompletedCourses = async (req, res, next) => {
    try {
        const userId = res.locals.userDetails.id;

        const stud = await Student.findOne({ firebaseKey: userId })

        if (stud) {
            const courses = await Course.find({ "studentsPassed.studentId": stud._id });

            return res.status(200).json({
                courses: courses
            })
        }

        return res.status(203).json({
            message: "Resource not found!"
        })


    } catch (err) {
        console.log(err);
    }
};


exports.putEnrollStudent = async (req, res, next) => {
    try {
        const userId = (res.locals.userDetails.id).toString();
        const courseId = req.body.courseId.toString();
        const stud = await Student.findOne({ firebaseKey: userId })
        
        if (stud) {
            const item = stud._id
            console.log("item + " + item)
            const result = await Course.updateOne({ _id: courseId }, { $push: { studentsEnrolled: {studentId: item} } });

            if (result)

                console.log(result);
            return res.status(200).json({
                result: result
            });
        }

        return res.status(203).json({
            message: "Resource not found!"
        })


    } catch (err) {
        console.log(err);
    }
};



exports.getSubmittedCourseAssignments = async (req, res, next) => {
    try {
        const courseId = req.params.courseId.toString();
        const studentId = req.params.studentId.toString();

        const a = await Assignment.find({ "submissionData.studentId": studentId, courseId: courseId }).populate('courseId').exec();

        if (a) {
            return res.status(200).json({
                assignments: a
            });
        }

        return res.status(404).json({
            message: "Record not found!"
        })


    } catch (err) {
        console.log(err);
    }
};





exports.patchSubmitAssignment = async (req, res, next) => {
    try {
        const userId = res.locals.userDetails.id;
        const courseId = req.body.courseId.toString();
        const assignmentId = req.body.assignmentId.toString();

        const submittedAt = Date.now().toString();

        const url = req.protocol + '://' + req.get('host');
        let filePath = '';
        const file = req.file;
        if (file) {
            filePath = url + "/files/" + file.filename;
        }


        const stud = await Student.findOne({ firebaseKey: userId });
        

        if (stud ) {
            
            if (filePath) {
                const fileName = req.body.submissionFilePath.toString();
                result = await Assignment.updateOne({ _id: assignmentId }, { $push: { studentSubmissions: {studentId: stud._id, submissionTime: submittedAt, submissionFilePath: filePath, submissionFileName: fileName} }})
                

                if(result)
                return res.status(200).json({
                    message: "Assignment Submitted!"
                });
            }
        }
        else {
            return res.status(403).json({
                message: "Error occured!"
            });
        }

    } catch (err) {
        console.log(err);
    }
};