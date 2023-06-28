import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "@/models/user";
import { connectToDB } from "@/utils/dataBase";


const secret = process.env.SECRET

export default async function handler(req, res) {

    if (req.method === 'POST') {
        await connectToDB()
        
        const { email, password } = req.body;

        try {
            const existingUser = await UserModel.findOne({ email });

            if (!existingUser) return res.status(404).json({ message: "User doesn't exist" });

            const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

            if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

            const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, secret, { expiresIn: "1h" });

            res.status(200).json({ result: existingUser, token });
        } catch (err) {
            res.status(500).json({ message: "Something went wrong" });
        }
        
    }else {
        res.status(405).json({ message: 'Method Not Allowed' });
      }
  }
  