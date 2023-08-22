import { Document, Schema, Types } from "mongoose";
import mongoose from "mongoose";

export interface IUser extends Document {
    _id?: string;
    username: string;
    password: string; // Remember to hash the password before saving
    email: string;
  }
  
  const userSchema = new Schema<IUser>(
    {
      username: String,
      password: String,
      email: String,
    },
  );
  
  export const User = mongoose.models.User || mongoose.model("User", userSchema);
  