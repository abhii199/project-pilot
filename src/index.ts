import dotenv from 'dotenv';
import app from './app';
import connectDB from './db/dbConnect';

dotenv.config({
    path: "./.env"
})

const PORT = process.env.PORT ?? 8000;

connectDB()
    .then(() => {
        app.listen(PORT, () => console.log(`Server is running on port: ${PORT} 🔥`));
    })
    .catch((err) => {
        console.log("MongoDB connection error", err);
        process.exit(1);
    })
 