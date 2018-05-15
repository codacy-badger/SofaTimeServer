import { ObjectID } from 'mongodb';

import User from './../../models/user';
import Movie from './../../models/movie';

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const testUsers = [{
    _id: userOneId,
    firstName: 'Damjan',
    lastName: 'Hudobreznik',
    email: 'damjan@email.com',
    password: 'Damjan\'sPassword'
},
{
    _id: userTwoId,
    firstName: 'John',
    lastName: 'Doe',
    email: 'doe@email.com',
    password: 'John\'sPassword'
}];

const testMovies = [{
    _id: new ObjectID(),
    title: 'Avengers: Infinity War',
    year: 2018,
    coverUrl: 'https://ia.media-imdb.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SY1000_CR0,0,674,1000_AL_.jpg'
}, {
    _id: new ObjectID(),
    title: 'Captain America: Civil War',
    year: 2016,
    coverUrl: 'https://ia.media-imdb.com/images/M/MV5BMjQ0MTgyNjAxMV5BMl5BanBnXkFtZTgwNjUzMDkyODE@._V1_SY1000_CR0,0,674,1000_AL_.jpg'
}];

const populateUsers = (done) => {
    User.remove({}).then((resolve, reject) => {
        const userOne = new User(testUsers[0]).save();
        const userTwo = new User(testUsers[1]).save();

        return Promise.all([userOne, userTwo]);
    }).then(() => done()).catch((e) => {
        done(e);
    });
};

const populateMovies = (done) => {
    Movie.remove({}).then(() => {
        const movieOne = new Movie(testMovies[0]).save();
        const movieTwo = new Movie(testMovies[1]).save();

        return Promise.all([movieOne, movieTwo]);
    }).then(() => done()).catch((e) => {
        done(e);
    });
};

export {
    testUsers,
    populateUsers,
    testMovies,
    populateMovies
};