const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth');
const tutController = require('../controllers/tutor');
const fileExtractor = require('../Middleware/fileUpload');

const imageExtractor = require('../Middleware/profileUpload');



router.get("/tutorCourses", tutController.getTutorCourses);
router.post("/course", imageExtractor ,tutController.postAddCourse);
router.put("/assignment/:assignmentId", fileExtractor ,tutController.putUpdateAssignment);
router.post("/assignment", fileExtractor ,tutController.postAddAssignment);
router.put("/course/:courseId",tutController.updateCourse);
router.get("/evaluateassignments/:courseId", tutController.getEvaluateCourseAssignment);
router.put("/evaluateassignment/:assignmentId", tutController.putEvaluateAssignment);



module.exports = router;