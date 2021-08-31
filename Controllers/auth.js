
const Tutor = require('../Models/Tutor');
const Student = require('../Models/Student');


exports.getLogin = async (req, res, next) => {
    console.log("getlogin reached")
    try {
        const loginAs = req.params.loginAs.toString();
        const userId = res.locals.userDetails.id.toString();
        const email = res.locals.userDetails.email;
        const name = res.locals.userDetails.name;

        const tut = await Tutor.findOne({ firebaseKey: userId })
        const stud = await Student.findOne({ firebaseKey: userId });

        if (loginAs === "tutor") {
            if (tut) {
                return res.status(201).json({
                    message: "You are successfully logedIn as a tutor",
                    userId: tut._id,
                    userName: tut.tutorName
                })
            }
            else {

                if (stud) {
                    return res.status(203).json({
                        message: "Your are already registered as a student!"
                    })
                }
                const tutor = new Tutor({
                    firebaseKey: userId,
                    email: email,
                    tutorName: name
                });

                const t = await tutor.save();

                return res.status(201).json({
                    message: "Your have been registered as a tutor!",
                    userId: t._id,
                    userName: tut.tutorName
                })
            }
        }
        else if (loginAs === "student") {
            if (stud) {
                return res.status(201).json({
                    message: "You are successfully logedIn as a student",
                    userId: stud._id,
                    userName: stud.studentName
                })
            }
            else {
                if (tut) {
                    return res.status(203).json({
                        message: "Your are already registered as a tutor!"
                    });
                }
                const student = new Student({
                    firebaseKey: userId,
                    email: email,
                    studentName: name
                });

                const s = await student.save();

                return res.status(201).json({
                    message: "Your have been registered as a student!",
                    userId: s._id,
                    userName: s.studentName
                })
            }
        }


    } catch (err) {
        console.log(err);
    }
};