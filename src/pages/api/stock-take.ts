import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import { connectToDatabase } from '../../../utils/dbConnect';
import { IPopulatedStockTake, IStockTake, StockTake } from '../../../models/stockTake'; // Adjust the path if necessary

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectToDatabase();

    switch (req.method) {
        case 'GET':
            try {
                // Check if an id is provided in the query
                const { id } = req.query;

                if (id) {
                    // Fetch a single stockTake by its id
                    const stockTake = (await StockTake.findById(id).populate('items.item')) as unknown as IPopulatedStockTake | null;
                    if (!stockTake) {
                        return res.status(404).json({ error: 'StockTake not found' });
                    }
                    return res.status(200).json(stockTake);
                } else {
                    // Fetch all stockTake entries
                    const stockTakes: IStockTake[] = await StockTake.find().populate('items.item');
                    return res.status(200).json(stockTakes);
                }
            } catch (error) {
                console.error(error);
                return res.status(500).json({ error: 'Error fetching stockTake entries' });
            }

        case 'POST':
            try {
                const stockTake = new StockTake(req.body);
                await stockTake.save();
                return res.status(201).json(stockTake);
            } catch (error) {
                console.error(error);
                return res.status(500).json({ error: 'Error creating stockTake entry' });
            }

        case 'PUT':
            try {
                const { _id, ...rest } = req.body;
                const updatedStockTake = await StockTake.findByIdAndUpdate(_id, rest, { new: true });
                if (!updatedStockTake) {
                    return res.status(404).json({ error: 'StockTake entry not found' });
                }
                return res.status(200).json(updatedStockTake);
            } catch (error) {
                console.error(error);
                return res.status(500).json({ error: 'Error updating stockTake entry' });
            }

        case 'DELETE':
            try {
                const { _id } = req.body;
                await StockTake.findByIdAndDelete(_id);
                return res.status(200).json({ message: 'StockTake entry deleted successfully' });
            } catch (error) {
                console.error(error);
                return res.status(500).json({ error: 'Error deleting stockTake entry' });
            }

        default:
            return res.status(405).json({ error: 'Method not allowed' });
    }
}
