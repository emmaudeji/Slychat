
import auth from "@/middleware/auth";
import { connectToDB } from "@/utils/dataBase";
import PostMessage from "@/models/PostMessage";

export default async function(req, res){

    // function to fetch all post with '/posts route'
    if(req.method === 'GET') {
        await connectToDB()
        try {
            const allPosts = await PostMessage.find();
            // console.log('fetched all posts--', allPosts)
            res.status(200).json({allPosts})
            
        } catch (error) {
            res.status(500).json({message: 'Server Error'})
        }
    } 

    // function to CREATE post with '/posts route'
    if(req.method === 'POST') {

        auth(req, res, async () => {
            await connectToDB()
            
            const post = req.body;

            const newPostMessage = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() })
        
            try {
                await newPostMessage.save();
        
                res.status(201).json(newPostMessage );
            } catch (error) {
                res.status(409).json({ message: error.message });
            }
        })
    }

}

