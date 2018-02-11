const Student = require('../../models/student');
import mongoose from 'mongoose'
let updateStudent = async (req, res, next) => {
    const id = req.params._id;
    if (!id) {
        return res.status(422).json({
            "message": "missing id"
        })
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            "message": "invalid id"
        });
    }
    const studentInfo = await Student.findById(id);
    try {
        await Student.update({ _id: id }, {
            $set: {
                name: req.body.name || studentInfo.name,
                age: req.body.age || studentInfo.age,
                courseId : req.body.courseId || studentInfo.courseId,
                imageUrl : req.body.imageUrl || studentInfo.imageUrl,
            }
        });
        const newStudent = await Student.findById(id);
        return res.status(200).json({
            "message": "updating complete correctly",
            student: {
                name: newStudent.name,
                age: newStudent.age,
                _id: newStudent._id,
                imageUrl :newStudent.imageUrl,
                courseId : newStudent.courseId 
            }
        })

    } catch (err) {
        return res.status(500).json({
            "message": "updating process not completed",
            error: err
        })
    }

}

export default updateStudent;