import mongoose from 'mongoose'
const Course = require('./course')

const studentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    imageUrl: {
        type: String,
        default : "https://cdn4.iconfinder.com/data/icons/professions-1-2/151/8-512.png"
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
});

module.exports = mongoose.model('Student', studentSchema);