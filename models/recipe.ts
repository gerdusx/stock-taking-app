import { Document, Schema, Types } from "mongoose";
import mongoose from "mongoose";
import { IStockItem } from "./stockItem";

export interface IRecipe extends Document {
    _id?: string;
    name: string;
    ingredients: Array<{ item: Types.ObjectId, quantity: number }>; // Reference to StockItem
}

// Assuming you have an IStockItem interface for the StockItem model
interface IRecipeIngredientPopulated {
    item: IStockItem;
    quantity: number;
}

export type IPopulatedRecipe = Omit<IRecipe, 'ingredients'> & {
    ingredients: IRecipeIngredientPopulated[];
};

const recipeSchema = new Schema<IRecipe>(
    {
        name: String,
        ingredients: [{
            item: { type: Types.ObjectId, ref: 'StockItem' },
            quantity: Number,
        }],
    },
);

export const Recipe = mongoose.models.Recipe || mongoose.model("Recipe", recipeSchema);
