import expect from 'expect';
import request from 'supertest';
import { ObjectID } from 'mongodb';

import app from './../server';

import User from './../models/user';

import { testUsers, populateUsers } from './seed/seed';

beforeEach(populateUsers);

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
});

// TODO: Add tests.