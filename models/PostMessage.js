// post message schema

import { Schema, model, models } from 'mongoose';

const postSchema = new Schema({
    title: String,
    message: String,
    name: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likes: { type: [String], default: [] },
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

const PostMessage = models.PostMessage ||  model('PostMessage', postSchema);

export default PostMessage;