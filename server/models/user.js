import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';


const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 2,
    trim: true
  },
  lastName: {
    type: String,
    required: false,
    minlength: 2,
    trim: true
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    trim: true,
    unique: true,
    validate: validator.isEmail,
    message: '{VALUE} is not a valid email'
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  }
});

const User = mongoose.model('User', UserSchema);

UserSchema.pre('save', function (next) {
  const user = this;

  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        next(err);
      }
      bcrypt.hash(user.password, salt, (e, hash) => {
        if (e) {
          next(e);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

export default User;