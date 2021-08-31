const mongoose = require('mongoose');

const assignmentSchema = mongoose.Schema({
    assignmentTitle: String,
    description: String,
    dueDate: Date,
    filePath: String,
    fullMarks: String,
    courseTitle: String,
    courseId: {type: mongoose.Types.ObjectId, ref: 'Course'},
    tutorName: String,
    fileName: String,
    studentSubmissions: [{studentId: {type: mongoose.Types.ObjectId, ref: 'Student'}, marksAlloted: String, submissionTime: Date, submissionFileName: String, submissionFilePath: String}]
});

module.exports = mongoose.model('Assignment', assignmentSchema);