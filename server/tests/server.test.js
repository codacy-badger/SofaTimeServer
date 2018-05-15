import expect from 'expect';
import request from 'supertest';
//import { ObjectID } from 'mongodb';

import app from './../server';

import User from './../models/user';
import Movie from './../models/movie';

import {
    testUsers,
    populateUsers,
    testMovies,
    populateMovies
} from './seed/seed';

beforeEach(populateUsers);
beforeEach(populateMovies);

describe('POST /users', () => {
    it('should create a user', (done) => {
        const email = 'example@example.com';
        const password = '123xzy!';
        const firstName = 'Joe';
        const lastName = 'Miller';
        request(app)
            .post('/users')
            .send({
                email,
                password,
                firstName,
                lastName
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.email).toBe(email);
                expect(res.body.firstName).toBe(firstName);
                expect(res.body.lastName).toBe(lastName);
            })
            .end((err) => {
                if (err) {
                    done(err);
                } else {
                    User.findOne({ email }).then((user) => {
                        expect(user).toBeTruthy();
                        expect(user.email).toBe(email);
                        expect(user.firstName).toBe(firstName);
                        expect(user.lastName).toBe(lastName);
                        expect(user.password).not.toBe(password);
                        done();
                    }).catch(e => done(e));
                }
            });
    });

    it('should not create a user with invalid body data', (done) => {
        request(app)
            .post('/users')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    done(err);
                } else {
                    User.find().then((users) => {
                        // Previously there are 2 inserted. This should not change.
                        expect(users.length).toBe(2);
                        done();
                    }).catch(e => done(e));
                }
            });
    });

    it('should not create a user with existing email', (done) => {
        request(app)
            .post('/users')
            .send({
                email: testUsers[0].email,
                password: 'NewUserPassword123',
                firstName: 'Joe',
                lastName: 'Miller'
            })
            .expect(400)
            .end((err, res) => {
                if (err) {
                    done(err);
                } else {
                    User.find().then((users) => {
                        // Previously there are 2 inserted. This should not change.
                        expect(users.length).toBe(2);
                        done();
                    }).catch(e => done(e));
                }
            });
    });
});

describe('POST /movies', () => {
    it('should create a movie', (done) => {
        const title = 'Iron Man 3';
        const year = 2013;
        const coverUrl = 'https://ia.media-imdb.com/images/M/MV5BMTkzMjEzMjY1M15BMl5BanBnXkFtZTcwNTMxOTYyOQ@@._V1_SY1000_SX700_AL_.jpg';
        request(app)
            .post('/movies')
            .send({
                title,
                year,
                coverUrl
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.title).toBe(title);
                expect(res.body.year).toBe(year);
                expect(res.body.coverUrl).toBe(coverUrl);
            })
            .end((err) => {
                if (err) {
                    done(err);
                } else {
                    Movie.findOne({ title }).then((movie) => {
                        expect(movie).toBeTruthy();
                        expect(movie.title).toBe(title);
                        expect(movie.year).toBe(year);
                        expect(movie.coverUrl).toBe(coverUrl);
                        done();
                    }).catch(e => done(e));
                }
            });
    });

    it('should not create a movie with invalid body data', (done) => {
        request(app)
            .post('/movies')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    done(err);
                } else {
                    User.find().then((movies) => {
                        // Previously there are 2 inserted. This should not change.
                        expect(movies.length).toBe(2);
                        done();
                    }).catch(e => done(e));
                }
            });
    });
});

describe('GET /movies', () => {
    it('should get all inserted movies', (done) => {
        request(app)
            .get('/movies')
            .expect(200)
            .expect((res) => {
                expect(res.body.movies.length).toBe(2);

                expect(res.body.movies[0].title).toBe(testMovies[0].title);
                expect(res.body.movies[0].year).toBe(testMovies[0].year);
                expect(res.body.movies[0].coverUrl).toBe(testMovies[0].coverUrl);

                expect(res.body.movies[1].title).toBe(testMovies[1].title);
                expect(res.body.movies[1].year).toBe(testMovies[1].year);
                expect(res.body.movies[1].coverUrl).toBe(testMovies[1].coverUrl);
            })
            .end(done);
    });
});

// TODO: Add tests.