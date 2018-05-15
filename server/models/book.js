import mongoose from 'mongoose';

const Book = mongoose.model('Book', {
    title: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    authors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'author',
        required: true // This means - At least one element in array.
    }],
    coverUrl: {
        type: String,
        required: false,
        trim: true
    }
});

export default Book;