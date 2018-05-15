import mongoose from 'mongoose';

const Author = new mongoose.model('Author', {
    firstName: {
        type: String,
        required: true,
        minlength: 2,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        minlength: 2,
        trim: true
    }
});

export default Author;