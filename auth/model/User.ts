import mongoose from 'mongoose';

// An interface that describe the properties
// that are required to create a new USER

interface UserInterface {
  email: string;
  password: string;
}

// An interface that  desc the props
// that a USER model has!

interface UserModel extends mongoose.Model<any> {
  build({ email, password }: UserInterface): any;
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

userSchema.statics.build = ({ email, password }: UserInterface) => {
  return new User({ email, password });
};

const User = mongoose.model<any, UserModel>('User', userSchema);

export default User;
