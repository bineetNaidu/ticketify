import mongoose from 'mongoose';

// An interface that describe the properties
// that are required to create a new USER

interface UserInterface {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: String,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('User', userSchema);

export const createUser = ({ email, password }: UserInterface) => {
  return new User({ email, password });
};

export default User;
