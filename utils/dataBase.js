import mongoose from 'mongoose';

let isConnected = false; // track the connection

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  if(isConnected) {
    console.log('MongoDB is already connected');
    return;
  }

  try {
    const res = await mongoose.connect(process.env.MONGODB_URI,
        {
      dbName: "chatboard",
      useNewUrlParser: true,
      useUnifiedTopology: true,
      }
    )

    isConnected = true;

    console.log('MongoDB connected')
  } catch (error) {
    console.log('MongoDB Error--', error);
  }
}
