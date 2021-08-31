const express = require('express');
const router = express.Router();

const studentController = require('../controllers/student');
const fileExtractor = require('../Middleware/fileUpload');


router.get("/courses", studentController.getAllCourses);
router.get("/enrolledcourses", studentController.getEnrolledCourses);
router.get("/completedcourses", studentController.getCompletedCourses);
router.post("/enrollstudent", studentController.putEnrollStudent);
router.get("/:studentId/submittedassignments/:courseId", studentController.getSubmittedCourseAssignments);
router.patch("/submitassignment", fileExtractor, studentController.patchSubmitAssignment);


module.exports = router;