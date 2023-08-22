import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../utils/dbConnect';
import { IUser, User } from '../../../models/user'; // Adjust the path if necessary

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectToDatabase();

    switch (req.method) {
        case 'GET':
            try {
                // Check if an id is provided in the query
                const { id } = req.query;
        
                if (id) {
                    // Fetch a single user by its id
                    const user: IUser | null = await User.findById(id);
                    if (!user) {
                        return res.status(404).json({ error: 'User not found' });
                    }
                    return res.status(200).json(user);
                } else {
                    // Fetch all users
                    const users: IUser[] = await User.find();
                    return res.status(200).json(users);
                }
            } catch (error) {
                console.error(error);
                return res.status(500).json({ error: 'Error fetching users' });
            }

        case 'POST':
            try {
                const user = new User(req.body);
                await user.save();
                return res.status(201).json(user);
            } catch (error) {
                console.error(error);
                return res.status(500).json({ error: 'Error creating user' });
            }

        case 'PUT':
            try {
                const { _id, ...rest } = req.body;
                const updatedUser = await User.findByIdAndUpdate(_id, rest, { new: true });
                if (!updatedUser) {
                    return res.status(404).json({ error: 'User not found' });
                }
                return res.status(200).json(updatedUser);
            } catch (error) {
                console.error(error);
                return res.status(500).json({ error: 'Error updating user' });
            }

        case 'DELETE':
            try {
                const { _id } = req.body;
                await User.findByIdAndDelete(_id);
                return res.status(200).json({ message: 'User deleted successfully' });
            } catch (error) {
                console.error(error);
                return res.status(500).json({ error: 'Error deleting user' });
            }

        default:
            return res.status(405).json({ error: 'Method not allowed' });
    }
}
