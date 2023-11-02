import mongoose from 'mongoose';

export const connectDB = () => {
   mongoose
      .connect('mongodb://127.0.0.1:27017', { dbName: 'netflix2' })
      .then(() => console.log('Database Connected'))
      .catch((error) => {
         console.log(error);
      });
};
