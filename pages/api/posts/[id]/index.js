

import auth from "@/middleware/auth";
import mongoose from 'mongoose';

import { connectToDB } from "@/utils/dataBase";
import PostMessage from "@/models/PostMessage";

export default async function(req, res){

    // function to update a post    api/posts/${id}
    if(req.method === 'PATCH') {
        // await connectToDB()
        auth(req, res, async () => {
        const { id } = req.query;
         
        const { title, message, creator, selectedFile, tags } = req.body;
        
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
        const updatedPost = { creator, title, message, tags, selectedFile, _id: id };
    
        const data = await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });
    
        res.json(data);
        })
    }

    // function to DELETE  a post    api/posts/${id}
    if(req.method === 'DELETE') {
        // await connectToDB()
        auth(req, res, async () => { 
        const { id } = req.query;

        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

        await PostMessage.findByIdAndRemove(id);

        res.json({ message: "Post deleted successfully." });
      })
    }


    // GET a post by id
    // if(req.method === 'GET') {
    //     auth(req, res, async () => {
            // const { id } = req.params;

    //     try {
    //         const post = await PostMessage.findById(id);
            
    //         res.status(200).json(post);
    //     } catch (error) {
    //         res.status(404).json({ message: error.message });
    //     }

    //     })
    // }
    
}