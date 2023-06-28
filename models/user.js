import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Email already exists!'],
    required: [true, 'Email is required!'],
  },
  name: {
    type: String,
    required: [true, 'Username is required!'],
    // match: [/^(?=.{3,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 3-20 alphanumeric letters and be unique!"]
  },
  password: {
    type: String,
  },
  image: {
    type: String,
  }
});

const UserModel = models.User || model("User", UserSchema);

export default UserModel;