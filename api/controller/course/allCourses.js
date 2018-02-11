const Course = require('../../models/course');
import mongoose from 'mongoose'

let allCourses = async (req, res, next) => {
    const perPage = 2;
    const page = req.query.page || 1;
    const allCourses = await Course.count();
    let courses = await Course.find()
        .skip((perPage * page) - perPage)
        .limit(perPage);
    if (courses.length > 0) {
        return res.status(200).json({
            allCourses: allCourses,
            count: courses.length,
            pages: Math.ceil(allCourses / perPage),
            currentPage: page,
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