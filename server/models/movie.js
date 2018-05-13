import mongoose from "mongoose";

const Movie = mongoose.model('Movie', {
    title: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    coverUrl: {
        type: String,
        required: false,
        trim: true
    },
    _creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});

export default Movie;