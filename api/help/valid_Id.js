import mongoose from 'mongoose'
let validId = (id, res, req, next) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            "message": "invalid id"
        });
    }
}

export default validId;