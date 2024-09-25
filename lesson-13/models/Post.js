import { Schema, model, Types } from 'mongoose'

const schema = new Schema({
    userId: {
        type: Types.ObjectId,
        ref: 'User',
        require: true
    },
    post: {
        type: String,
        require: true
    },
    createAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

export const Post = model('Posts', schema);