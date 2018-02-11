import mongoose from 'mongoose'

const courseSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String
    },
    price: {
        type: Number
    }
});

module.exports = mongoose.model('Course', courseSchema);