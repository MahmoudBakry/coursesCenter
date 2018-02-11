import mongoose from 'mongoose'
const Course = require('../../models/course');
import validId from '../..//help/valid_Id';

let courseDetails = async (req, res, next) => {
    const id = req.params._id;
    if (!id) {
        return res.status(422).json({
            "message": "must to sent id of this course"
        })
    }
    //fanction to check if _id is valid
    //validId(id);
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            "message": "invalid id"
        });
    }
    //retrive course details
    let courseDetail = await Course.findById(id).select('_id name price');
    if (courseDetail) {
        return res.status(200).json({
            data: courseDetail
        })
    }
    return res.status(204).json({
        "message": "no Course has found with this id"
    })
};

export default courseDetails;
