import mongoose, { Document, Schema } from "mongoose";

export enum UserRoles {
  CREATOR = "CREATOR",
  VIEWER = "VIEWER",
  VIEW_ALL = "VIEW_ALL",
}

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  roles: [{ type: String, enum: Object.values(UserRoles) }],
});

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  roles: string[];
}

const User = mongoose.model<IUser>("User", userSchema);
export default User;
