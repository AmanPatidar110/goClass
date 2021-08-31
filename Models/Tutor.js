const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tutorSchema = mongoose.Schema({
    firebaseKey: String,
    tutorName: String,
    email: String,
    profileImagePath: String,
});

module.exports = mongoose.model('Tutor', tutorSchema);