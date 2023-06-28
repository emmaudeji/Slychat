import auth from '@/middleware/auth';

import mongoose from 'mongoose';

import PostMessage from "@/models/PostMessage";

export default async function(req, res){

    // function to update a post    api/posts/${id}
   
    if(req.method === 'PATCH') {

        auth(req, res, async () => {
            const { id } = req.query;

            if (!req.userId) {
                return res.json({ message: "Unauthenticated" });
            }

            if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
            
            const post = await PostMessage.findById(id);

            const index = post.likes.findIndex((id) => id === String(req.userId));

            if (index === -1) {
            post.likes.push(req.userId);
            } else {
            post.likes = post.likes.filter((id) => id !== String(req.userId));
            }
            const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
            res.status(200).json(updatedPost);  

        } ) 
    }
}