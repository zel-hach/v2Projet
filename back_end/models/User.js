import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    age: Number,
    email: String,
    phone: String,
    city: String,
    status: String,
    coffeeType: String,
    imageUrl: String,
    videoUrl: String,
});

export default mongoose.model('User', userSchema);
