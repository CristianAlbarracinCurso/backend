import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const collection = "users";
const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
  photo: { type: String, default: "userNone.jpg" },
  role: {
    type: String,
    enum: ["user", "admin", "prem"],
    default: "user",
    index: true,
  },
  isOnline: { type: Boolean, default: false, index: true },
});

userSchema.plugin(mongoosePaginate);
const Users = model(collection, userSchema);
export default Users;
