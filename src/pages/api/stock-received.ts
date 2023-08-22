import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import { connectToDatabase } from '../../../utils/dbConnect';
import { IPopulatedStockReceive, IStockReceive, StockReceive } from '../../../models/stockReceive'; // Adjust the path if necessary

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectToDatabase();

    switch (req.method) {
        case 'GET':
            try {
                // Check if an id is provided in the query
                const { id } = req.query;
        
                if (id) {
                    // Fetch a single stockReceived by its id
                    const stockReceived = (await StockReceive.findById(id).populate('items.item')) as unknown as IPopulatedStockReceive | null;
                    if (!stockReceived) {
                        return res.status(404).json({ error: 'StockReceived not found' });
                    }
                    return res.status(200).json(stockReceived);
                } else {
                    // Fetch all stockReceived entries
                    const stockReceivedEntries: IStockReceive[] = await StockReceive.find().populate('items.item');
                    return res.status(200).json(stockReceivedEntries);
                }
            } catch (error) {
                console.error(error);
                return res.status(500).json({ error: 'Error fetching stockReceived entries' });
            }

        case 'POST':
            try {
                const stockReceived = new StockReceive(req.body);
                await stockReceived.save();
                return res.status(201).json(stockReceived);
            } catch (error) {
                console.error(error);
                return res.status(500).json({ error: 'Error creating stockReceived entry' });
            }

        case 'PUT':
            try {
                const { _id, ...rest } = req.body;
                const updatedStockReceived = await StockReceive.findByIdAndUpdate(_id, rest, { new: true });
                if (!updatedStockReceived) {
                    return res.status(404).json({ error: 'StockReceived entry not found' });
                }
                return res.status(200).json(updatedStockReceived);
            } catch (error) {
                console.error(error);
                return res.status(500).json({ error: 'Error updating stockReceived entry' });
            }

        case 'DELETE':
            try {
                const { _id } = req.body;
                await StockReceive.findByIdAndDelete(_id);
                return res.status(200).json({ message: 'StockReceived entry deleted successfully' });
            } catch (error) {
                console.error(error);
                return res.status(500).json({ error: 'Error deleting stockReceived entry' });
            }

        default:
            return res.status(405).json({ error: 'Method not allowed' });
    }
}
