import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import { connectToDatabase } from '../../../utils/dbConnect';
import { IStockItem, StockItem } from '../../../models/stockItem';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectToDatabase();

    switch (req.method) {
        case 'GET':
            try {
                const stockItems: IStockItem[] = await StockItem.find();
                return res.status(200).json(stockItems);
            } catch (error) {
                console.error(error);
                return res.status(500).json({ error: 'Error fetching stock items' });
            }

        case 'POST':
            try {
                const stockItem = new StockItem(req.body);
                await stockItem.save();
                return res.status(201).json(stockItem);
            } catch (error) {
                console.error(error);
                return res.status(500).json({ error: 'Error creating stock item' });
            }

        case 'PUT':
            try {
                const { _id, ...rest } = req.body;
                const updatedStockItem = await StockItem.findByIdAndUpdate(_id, rest, { new: true });
                if (!updatedStockItem) {
                    return res.status(404).json({ error: 'Stock item not found' });
                }
                return res.status(200).json(updatedStockItem);
            } catch (error) {
                console.error(error);
                return res.status(500).json({ error: 'Error updating stock item' });
            }

        case 'DELETE':
            try {
                const { _id } = req.body;
                await StockItem.findByIdAndDelete(_id);
                return res.status(200).json({ message: 'Stock item deleted successfully' });
            } catch (error) {
                console.error(error);
                return res.status(500).json({ error: 'Error deleting stock item' });
            }

        default:
            return res.status(405).json({ error: 'Method not allowed' });
    }
}
