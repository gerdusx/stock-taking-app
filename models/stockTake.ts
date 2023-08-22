import { Document, Schema, Types } from "mongoose";
import mongoose from "mongoose";
import { IStockItemPopulated } from "./stockItem";

export interface IStockTake extends Document {
    _id?: string;
    date: Date;
    items: Array<{ item: Types.ObjectId, quantity: number }>; // Reference to StockItem
}

export type IPopulatedStockTake = Omit<IStockTake, 'items'> & {
    items: IStockItemPopulated[];
};

const stockTakeSchema = new Schema<IStockTake>(
    {
        date: Date,
        items: [{
            item: { type: Types.ObjectId, ref: 'StockItem' },
            quantity: Number,
        }],
    },
);

export const StockTake = mongoose.models.StockTake || mongoose.model("StockTake", stockTakeSchema);
