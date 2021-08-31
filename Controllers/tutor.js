const Tutor = require('../Models/Tutor');
const Student = require('../Models/Student');
const Course = require('../Models/Course');

const mongoose = require('mongoose');
const Assignment = require('../Models/Assignment');


exports.getTutorCourses = async (req, res, next) => {
    try {
        const userId = res.locals.userDetails.id;

        const tut = await Tutor.findOne({ firebaseKey: userId })

        if (tut) {
            const courses = await Course.find({ tutorId: tut._id });
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


exports.postAddCourse = async (req, res, next) => {
    try {
        const userId = res.locals.userDetails.id;

        const url = req.protocol + '://' + req.get('host');
        let imagePath = '';
        const file = req.file;

        if (file) {
            imagePath = url + "/images/" + file.filename;
        }

        const tut = await Tutor.findOne({ firebaseKey: userId });

        if (tut) {
            const course = new Course({
                courseTitle: req.body.courseTitle.toString(),
                description: req.body.description.toString(),
                duration: req.body.duration.toString(),
                courseImagePath: imagePath,
                tutorId: mongoose.Types.ObjectId(tut._id)
            })

            await course.save();

            return res.status(200).json({
                message: "New course created!"
            });
        }
        else {
            return res.status(403).json({
                message: "Unathorized Access!"
            });
        }

    } catch (err) {
        console.log(err);
    }
};


exports.updateCourse = async (req, res, next) => {
    try {
        const userId = res.locals.userDetails.id;
        const courseId = req.params.courseId?.toString();

        const courseTitle = req.body.courseTitle?.toString();
        const description = req.body.description?.toString();
        const duration = req.body.duration?.toString();

        const url = req.protocol + '://' + req.get('host');
        let imagePath = '';
        const file = req.file;
        if (file) {
            imagePath = url + "/images/" + file.filename;
        }


        const tut = await Tutor.findOne({ firebaseKey: userId });

        if (tut) {
            console.log("compare" + tut._id === courseId)
            const result = await Course.updateOne({ _id: courseId }, {
                courseTitle: courseTitle,
                description: description,
                duration: duration
            })
            console.log("description: " + result);
            if (imagePath) {
                result = Course.updateOne({ _id: courseId }, {
                    courseImagePath: imagePath
                })
            }

            return res.status(200).json({
                message: "Course updated!"
            });
        }
        else {
            return res.status(403).json({
                message: "Unathorized Access!"
            });
        }

    } catch (err) {
        console.log(err);
    }
};


exports.postAddAssignment = async (req, res, next) => {
    try {
        const userId = res.locals.userDetails.id;
        const courseId = req.body.courseId.toString();

        const url = req.protocol + '://' + req.get('host');
        let filePath = '';
        const file = req.file;

        if (file) {
            filePath = url + "/files/" + file.filename;

        }

        const tut = await Tutor.findOne({ firebaseKey: userId });
        const course = await Course.findOne({ _id: courseId });

        console.log("tut" + tut, "cor" + course);
        if (!tut || !course)
            return res.status(203).json({
                message: "Unathorized Access!"
            });

        const assignment = new Assignment({
            assignmentTitle: req.body.assignmentTitle.toString(),
            description: req.body.description.toString(),
            dueDate: req.body.dueDate.toString(),
            fullMarks: req.body.fullMarks.toString(),
            filePath: filePath,
            fileName: file ? req.body.filename : "",
            tutorId: mongoose.Types.ObjectId(tut._id),
            courseId: mongoose.Types.ObjectId(courseId),
            tutorname: tut.tutorName
        })

        await assignment.save();

        return res.status(200).json({
            message: "New assignment created!"
        });

    } catch (err) {
        console.log(err);
    }
};


exports.putUpdateAssignment = async (req, res, next) => {
    try {
        const userId = res.locals.userDetails.id;
        const assignmentId = req.params.assignmentId;

        const url = req.protocol + '://' + req.get('host');
        let filePath = '';
        const file = req.file;
        if (file) {
            filePath = url + "/files/" + file.filename;
        }

        const tut = await Tutor.findOne({ firebaseKey: userId });
        const course = await Course.findOne({ _id: req.body.courseId });
        if (!tut || !course)
            return res.status(203).json({
                message: "Unathorized Access!"
            });


        const result = await Assignment.updateOne({ _id: assignmentId }, {
            assignmentTitle: req.body.assignmentTitle.toString(),
            description: req.body.description.toString(),
            dueDate: req.body.dueDate.toString(),
            fullMarks: req.body.fullMarks.toString(),
        })

        if (filePath) {
            result = Course.updateOne({ _id: courseId }, {
                filePath: filePath,
                fileName: file ? req.body.filename : "",
            })
        }

        res.status(200).json({
            message: "Course updated!"
        });


    } catch (err) {
        console.log(err);
    }
};


exports.putEvaluateAssignment = async (req, res, next) => {
    try {
        const userId = res.locals.userDetails.id;
        const assignmentId = req.params.assignmentId;

        studentId = req.body.studentId;
        marksAlloted = req.body.marksAlloted;

        const url = req.protocol + '://' + req.get('host');
        let filePath = '';
       

        const tut = await Tutor.findOne({ firebaseKey: userId });
        if (!tut )
            return res.status(203).json({
                message: "Unathorized Access!"
            });

        const result = await Assignment.updateOne({'studentSubmissions.studentId' : studentId }, {'$set': {
            'studentSubmissions.$.marksAlloted': marksAlloted,
      }})

      
        res.status(200).json({
            message: "Evaluation updated!"
        });


    } catch (err) {
        console.log(err);
    }
};



exports.getEvaluateCourseAssignment = async (req, res, next) => {
    try {
        const courseId = req.params.courseId.toString();
        const a = await Assignment.find({ courseId: courseId }).populate('courseId').exec();

        const evaluateAssignments = a.filter((element) => {
            return new Date(element.dueDate) < Date.now();
        })
        if (a) {
            return res.status(200).json({
                assignments: evaluateAssignments
            });
        }

        return res.status(404).json({
            message: "Record not found!"
        })


    } catch (err) {
        console.log(err);
    }
};
