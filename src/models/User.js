import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'], // Ensure that this field is required
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'], // Ensure email is required
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'], // Ensure password is required
  },
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;
