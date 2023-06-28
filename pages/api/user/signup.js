import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "@/models/user";
import { connectToDB } from "@/utils/dataBase";

const secret = process.env.SECRET

export default async function handler(req, res) {
    if (req.method === 'POST') {
        await connectToDB();
        
        const { email, password, fName, lName } = req.body;

        try {
            const existingUser = await UserModel.findOne({ email });

            if (existingUser) return res.status(400).json({ message: "Email already exists" });

            const hashedPassword = await bcrypt.hash(password, 12);

            const result = await UserModel.create({ email, password: hashedPassword, name: `${fName} ${lName}` });

            const token = jwt.sign( { email: result.email, id: result._id }, secret, { expiresIn: "1h" } );

            res.status(201).json({ result, token });
        } catch (error) {
            res.status(500).json({ message: "Something went wrong" });
            
            console.log(error);
        }

    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
      }

}