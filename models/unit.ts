import { Document, Schema, Types } from "mongoose";
import mongoose from "mongoose";

export interface IUnit extends Document {
    _id?: string;
    name: string;
    abbreviation: string;
  }
  
  const unitSchema = new Schema<IUnit>(
    {
      name: String,
      abbreviation: String,
    },
  );
  
  export const Unit = mongoose.models.Unit || mongoose.model("Unit", unitSchema);
  