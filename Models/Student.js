const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = mongoose.Schema({
    firebaseKey: String,
    studentName: String,
    email: String,
    profileImagePath: String
});

module.exports = mongoose.model('Student', studentSchema);