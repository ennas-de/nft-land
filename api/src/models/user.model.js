import mongoose, { Schema } from 'mongoose';
import countries from '../constants/countries.js';

const addressSchema = new Schema({
  country: { type: String, required: true, enum: countries },
  state: { type: String, required: true },
  city: { type: String, required: true },
  street: { type: String, required: true },
  house: { type: String },
  zipcode: { type: String, required: true, match: /^\d{5}(-\d{4})?$/ },
});

const userSchema = new Schema(
  {
    firstname: { type: String, required: true, trim: true },
    lastname: { type: String, required: true, trim: true },
    age: { type: Number, required: true, min: 17, max: 85 },
    gender: { type: String, required: true, enum: ['male', 'female', 'other'] },
    loginDetail: { type: String, required: true },
    password: { type: String, required: true },
    profilePic: { type: String, default: '' },
    addresses: {
        type: [addressSchema],
        default: []
    },
    wallet: {
      type: Schema.Types.ObjectId,
      ref: "Wallet",
      required: true
    },
    scanCount: {
      type: Number,
      enum: [0, 1, 2, 3, 4, 5],
      default: 0
    },
    refreshToken: {type: String},
    refreshTokenExpiresAt: {type: Date}
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (doc, ret) => {
        delete ret.password; 
        return ret;
      },
    },
  }
);

userSchema.virtual('fullName').get(function () {
  return `${this.firstname} ${this.lastname}`;
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
