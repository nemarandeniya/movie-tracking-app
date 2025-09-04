import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    genre: {
        type: String
    },
    year: {
        type: Number
    },
    description: {
        type: String
    },
    poster: {
        type: String
    }
}, {
    timestamps: true
})

const Movie = mongoose.model("Movie", movieSchema)
export default Movie