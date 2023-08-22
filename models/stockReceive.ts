import { Document, Schema, Types } from "mongoose";
import mongoose from "mongoose";
import { IStockItemPopulated } from "./stockItem";

export interface IStockReceive extends Document {
    _id?: string;
    date: Date;
    items: Array<{ item: Types.ObjectId, quantity: number }>; // Reference to StockItem
}

export type IPopulatedStockReceive = Omit<IStockReceive, 'items'> & {
    items: IStockItemPopulated[];
};

const stockReceiveSchema = new Schema<IStockReceive>(
    {
        date: Date,
        items: [{
            item: { type: Types.ObjectId, ref: 'StockItem' },
            quantity: Number,
        }],
    },
);

export const StockReceive = mongoose.models.StockReceive || mongoose.model("StockReceive", stockReceiveSchema);
