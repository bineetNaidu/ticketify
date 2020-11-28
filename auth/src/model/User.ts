import mongoose from 'mongoose';
import Password from '../utils/Password';

//? An interface that describe the properties
//? that are required to create a new USER
interface UserInterface {
  email: string;
  password: string;
}

//? An interface that  desc the props
//? that a USER model has!
interface UserModel extends mongoose.Model<UserDoc> {
  build({ email, password }: UserInterface): UserDoc;
}

//? An interface that describe the properties
//? that a User Document has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: String,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      versionKey: false,
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
      },
    },
  },
);

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
  next();
});

userSchema.statics.build = ({ email, password }: UserInterface) => {
  return new User({ email, password });
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export default User;
