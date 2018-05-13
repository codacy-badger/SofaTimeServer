// Do config first.
import "./config/config";

import _ from 'lodash';
import express from 'express';
import bodyParser from 'body-parser';
import { ObjectID } from 'mongodb';

// DB
import './db/mongoose';
import User from './models/user';
import Movie from "./models/movie";
import Book from "./models/book";

// Port will be set in config or just use default 3000.
const port = process.env.port || 3000;
const app = express();

app.use(bodyParser.json());

// app.get('/movies', async (req, res) => {
//     try {
//         // TODO: implement!
//       res.send({ "test": 1 });
//     } catch (e) {
//       res.status(400).send(e);
//     }
//   });

// app.get('/books', async (req, res) => {
//     try {
//         //TODO: implement!
//         res.send({ "test": 2 });
//     } catch (e) {
//         res.status(400).send(e);
//     }
// });

app.post("/users", async (req, res) => {
    try {
        const body = _.pick(req.body, ['firstName', 'lastName', 'email', 'password']);
        const newUser = new User(body);
        await newUser.save();
        res.status(200).send(newUser);
    } catch (e) {
        res.status(400).send(e);
    }
});

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

export default app;