import { Document, Schema, Types } from "mongoose";
import mongoose from "mongoose";

export interface IStockItem extends Document {
  _id?: string;
  name: string;
}

const stockItemSchema = new Schema<IStockItem>(
  {
    name: String,
  },
);

export const StockItem = mongoose.models.StockItem ||
  mongoose.model("StockItem", stockItemSchema);
