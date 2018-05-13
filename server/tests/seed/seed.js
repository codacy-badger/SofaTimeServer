import { ObjectID } from "mongodb";

import User from './../../models/user';

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const testUsers = [{
    _id: userOneId,
    firstName: "Damjan",
    lastName: "Hudobreznik",
    email: "damjan@email.com",
    password: "Damjan'sPassword"
},
{
    _id: userTwoId,
    firstName: "John",
    lastName: "Doe",
    email: "doe@email.com",
    password: "John'sPassword"
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

export { testUsers, populateUsers };