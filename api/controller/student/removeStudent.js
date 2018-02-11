const Student = require('../../models/student');
import mongoose from 'mongoose'
let removeStudent = async (req, res, next) => {
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
    try {
        const studentDetails = await Student.findById(id);
        if (studentDetails) {
            await Student.remove({ _id: id });
            return res.status(204).json({
                "message": "student has deleted"
            })
        } else {
            return res.status(400).json({
                "message": "no student with this id"
            });
        }
    } catch (error) {
        return res.status(500).json({
            "message": "deletting has error",
            err: error
        })
    }
}

export default removeStudent;