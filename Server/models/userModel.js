import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    profilePhoto: {
        type: String
    },
    savedMovies: [
        {
            imdbId: String,
            title: String,
            poster: String
        }
    ]
}, {
    timestamps: true
})

const User = mongoose.model("User", userSchema)
export default User