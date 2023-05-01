const { Schema, model } = require("mongoose");
var validator = require("validator");

const userSchema = new Schema(
  {
    name: {
      type: String,
      minlength: [2, "name should be min 2 characters"],
      required: [true, "name is mandatory"],
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
      validate: {
        validator: validator.isEmail,
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    password: {
      type: String,
      minlength: [6, "password should be min 6 characters"],
      required: [true, "password is mandatory"],
    },
    phone: {
      type: String,
      required: [true, "User phone is required"],
    },

    image: {
      type: String,
      default: "../../public/images/users/test.jpg",
    },
    is_admin: {
      type: Boolean,
      default: 0,
    },
    is_banned: {
      type: Boolean,
      default: false,
    },
    createdOn: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const User = model("users", userSchema);
module.exports = User;
