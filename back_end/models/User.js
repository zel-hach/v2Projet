import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    age: Number,
    email: { type: String, unique: true, sparse: true },
    phone: String,
    city: String,
    status: String,
    /** Nombre de tasses « aujourd’hui » (agrégé sur le tableau de bord). */
    cupsToday: { type: Number, default: 0 },
    coffeeType: String,
    imageUrl: String,
    videoUrl: String,
    /** Hashed; only for login accounts (seeded admin / viewer). */
    password: { type: String, select: false },
    role: {
        type: String,
        enum: ["admin", "viewer"],
    },
});

export default mongoose.model('User', userSchema);
