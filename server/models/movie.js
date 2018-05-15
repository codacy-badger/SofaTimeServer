import mongoose from 'mongoose';
import validator from 'validator';

const Movie = mongoose.model('Movie', {
    title: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    year: {
        type: Number,
        required: true
    },
    coverUrl: {
        type: String,
        required: false,
        trim: true,
        validate: validator.isURL,
        message: '{VALUE} is not a valid URL'
    }
});

export default Movie;