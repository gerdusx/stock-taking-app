import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import { connectToDatabase } from '../../../utils/dbConnect';
import { ICategory, Category } from '../../../models/category'; // Adjust the path if necessary

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectToDatabase();

    switch (req.method) {
        case 'GET':
            try {
                const categories: ICategory[] = await Category.find();
                return res.status(200).json(categories);
            } catch (error) {
                console.error(error);
                return res.status(500).json({ error: 'Error fetching categories' });
            }

        case 'POST':
            try {
                const category = new Category(req.body);
                await category.save();
                return res.status(201).json(category);
            } catch (error) {
                console.error(error);
                return res.status(500).json({ error: 'Error creating category' });
            }

        case 'PUT':
            try {
                const { _id, ...rest } = req.body;
                const updatedCategory = await Category.findByIdAndUpdate(_id, rest, { new: true });
                if (!updatedCategory) {
                    return res.status(404).json({ error: 'Category not found' });
                }
                return res.status(200).json(updatedCategory);
            } catch (error) {
                console.error(error);
                return res.status(500).json({ error: 'Error updating category' });
            }

        case 'DELETE':
            try {
                const { _id } = req.body;
                await Category.findByIdAndDelete(_id);
                return res.status(200).json({ message: 'Category deleted successfully' });
            } catch (error) {
                console.error(error);
                return res.status(500).json({ error: 'Error deleting category' });
            }

        default:
            return res.status(405).json({ error: 'Method not allowed' });
    }
}
