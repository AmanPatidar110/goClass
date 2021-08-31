const express = require('express');
const router = express.Router();

const commonController = require('../controllers/common');



router.get("/course/:courseId", commonController.getCourse);
router.get("/assignment/:assignmentId", commonController.getAssignment);
router.get("/assignments/:courseId", commonController.getAllCourseAssignment);
router.get("/liveassignments/:courseId", commonController.getLiveCourseAssignment);


module.exports = router;