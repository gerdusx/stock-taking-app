import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../utils/dbConnect';
import { IUnit, Unit } from '../../../models/unit'; // Adjust the path if necessary

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectToDatabase();

    switch (req.method) {
        case 'GET':
            try {
                // Check if an id is provided in the query
                const { id } = req.query;
        
                if (id) {
                    // Fetch a single unit by its id
                    const unit: IUnit | null = await Unit.findById(id);
                    if (!unit) {
                        return res.status(404).json({ error: 'Unit not found' });
                    }
                    return res.status(200).json(unit);
                } else {
                    // Fetch all units
                    const units: IUnit[] = await Unit.find();
                    return res.status(200).json(units);
                }
            } catch (error) {
                console.error(error);
                return res.status(500).json({ error: 'Error fetching units' });
            }

        case 'POST':
            try {
                const unit = new Unit(req.body);
                await unit.save();
                return res.status(201).json(unit);
            } catch (error) {
                console.error(error);
                return res.status(500).json({ error: 'Error creating unit' });
            }

        case 'PUT':
            try {
                const { _id, ...rest } = req.body;
                const updatedUnit = await Unit.findByIdAndUpdate(_id, rest, { new: true });
                if (!updatedUnit) {
                    return res.status(404).json({ error: 'Unit not found' });
                }
                return res.status(200).json(updatedUnit);
            } catch (error) {
                console.error(error);
                return res.status(500).json({ error: 'Error updating unit' });
            }

        case 'DELETE':
            try {
                const { _id } = req.body;
                await Unit.findByIdAndDelete(_id);
                return res.status(200).json({ message: 'Unit deleted successfully' });
            } catch (error) {
                console.error(error);
                return res.status(500).json({ error: 'Error deleting unit' });
            }

        default:
            return res.status(405).json({ error: 'Method not allowed' });
    }
}
