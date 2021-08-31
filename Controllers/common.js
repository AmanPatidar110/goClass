const Tutor = require('../Models/Tutor');
const Student = require('../Models/Student');
const Course = require('../Models/Course');
const Assignment = require('../Models/Assignment');

exports.getCourse = async (req, res, next) => {
    try {
        const courseId = req.params.courseId.toString();
        const c = await Course.findOne({ _id: courseId }).populate('tutorId').exec();

        if (c) {
            return res.status(200).json({
                course: c
            });
        }

        return res.status(404).json({
            message: "Record not found!"
        })


    } catch (err) {
        console.log(err);
    }
};

exports.getAssignment = async (req, res, next) => {
    try {
        const assignmentId = req.params.assignmentId.toString();
        const a = await Assignment.findOne({ _id: assignmentId }).populate(['courseId','studentSubmissions.studentId']).exec();

        if (a) {
            return res.status(200).json({
                assignment: a
            });
        }

        return res.status(203).json({
            message: "Record not found!"
        })


    } catch (err) {
        console.log(err);
    }
};

exports.getAllCourseAssignment = async (req, res, next) => {
    try {
        const courseId = req.params.courseId.toString();
        const a = await Assignment.find({ courseId: courseId }).populate("courseId").exec();

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

exports.getLiveCourseAssignment = async (req, res, next) => {
    try {
        const courseId = req.params.courseId;
        console.log("courseId" + courseId)
        const a = await Assignment.find({ courseId: courseId }).populate('courseId').exec();

        const liveAssignments = a.filter((element) => {
            return new Date(element.dueDate) > Date.now();
        })
        if (a) {
            return res.status(200).json({
                assignments: liveAssignments
            });
        }

        return res.status(404).json({
            message: "Record not found!"
        })


    } catch (err) {
        console.log(err);
    }
};
