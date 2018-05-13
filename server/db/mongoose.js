import mongoose from 'mongoose';

mongoose.Poromise = global.Promise;

mongoose.connect(process.env.MONGODB_URL, function () { /* dummy function */ })
    .then(() => {
        // Successfully connected.
    })
    .catch(err => {
        console.error('App starting error:', err.stack);
        process.exit(1);
    });

export default mongoose;