const Student = require('../../models/student');
import mongoose from 'mongoose'

let allStudents = async (req, res, next) => {
    const perPage = 2;
    const page = req.query.page || 1;
    const allStudents = await Student.count();
    let students = await Student.find().populate('courseId', 'name price')
        .skip((perPage * page) - perPage)
        .limit(perPage);
    if (students.length > 0) {
        return res.status(200).json({
            allStudents : allStudents,
            count: students.length,
            pages: Math.ceil(allStudents / perPage),
            currentPage: page,
            data: students.map(elem => {
                return {
                    _id: elem._id,
                    name: elem.name,
                    age: elem.age,
                    imageUrl : elem.imageUrl,
                    courseId : elem.courseId,
                    request: {
                        type: 'GET',
                        url: "http://" + process.env.HOST + ":" + process.env.PORT + "/students/" + elem._id
                    }
                }
            }),
            
        })
    }
    return res.status(204).json({
        //"message": "no courses exist yet"
    })
}

export default allStudents;