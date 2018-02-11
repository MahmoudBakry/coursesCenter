import mongoose from 'mongoose'
import validId from '../../help/valid_Id';
const Course = require('../../models/course');
const Student = require('../../models/student');

let studentDetails = async (req, res, next) => {
    const id = req.params._id;
    if (!id) {
        return res.status(422).json({
            "message": "missing id"
        })
    }
    //validId(id);
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            "message": "invalid id"
        });
    }
    const studentDetail = await Student.findById(id)
        .select('_id name age imageUrl')
        .populate('courseId', 'name price');
    if(studentDetail){
        return res.status(200).json({
            student : studentDetail
        })
    }
    return res.status(204).json({
        "message" :"no student with this id"
    }) 
}
export default studentDetails;