import { Document, Schema, Types } from "mongoose";
import mongoose from "mongoose";

export interface IStockItem extends Document {
  _id?: string;
  name: string;
  unit: mongoose.Types.ObjectId; // Reference to Unit
  quantity: number;
}

export interface IStockItemPopulated {
  item: IStockItem;
  quantity: number;
}

const stockItemSchema = new Schema<IStockItem>(
  {
    name: String,
    unit: { type: Schema.Types.ObjectId, ref: 'Unit' },
    quantity: Number,
  },
);

export const StockItem = mongoose.models.StockItem || mongoose.model("StockItem", stockItemSchema);

