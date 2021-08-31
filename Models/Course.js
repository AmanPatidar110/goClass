const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = mongoose.Schema({
    courseTitle: String,
    description: String,
    duration: String,
    courseImagePath: String,
    tutorId: {type: Schema.Types.ObjectId, ref: 'Tutor'},
    studentsEnrolled: [{studentId: {type: Schema.Types.ObjectId, ref: 'Student'}}],
    studentsPassed: [{studentId: {type: Schema.Types.ObjectId, ref: 'Student'}}],
    assignments:  [{studentId: {type: Schema.Types.ObjectId, ref: 'Assignment'}}],
    Tests:  [{studentId: {type: Schema.Types.ObjectId, ref: 'Test'}}]
});

module.exports = mongoose.model('Course', courseSchema);