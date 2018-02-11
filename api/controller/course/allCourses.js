const Course = require('../../models/course');
import mongoose from 'mongoose'
let allCourses = async (req, res, next) => {
    let courses = await Course.find();
    if (courses.length > 0) {
        return res.status(200).json({
            count: courses.length,
            data: courses.map(elem => {
                return {
                    _id: elem._id,
                    name: elem.name,
                    price: elem.price,
                    request: {
                        type: 'GET',
                        url: "http://" + process.env.HOST + ":" + process.env.PORT + "/courses/" + elem._id
                    }
                }
            }),
        })
    }
    return res.status(204).json({
        "message": "no courses exist yet"
    })
}

export default allCourses;