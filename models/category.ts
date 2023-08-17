import { Document, Schema, Types } from "mongoose";
import mongoose from "mongoose";

export interface ICategory extends Document {
  _id?: string;
  name: string;
}

const categorySchema = new Schema<ICategory>(
  {
    name: String,
  },
);

export const Category = mongoose.models.Category || mongoose.model("Category", categorySchema);

