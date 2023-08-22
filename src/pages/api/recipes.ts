import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../utils/dbConnect';
import { IPopulatedRecipe, IRecipe, Recipe } from '../../../models/recipe'; // Adjust the path if necessary

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectToDatabase();

    switch (req.method) {
        case 'GET':
            try {
                // Check if an id is provided in the query
                const { id } = req.query;
        
                if (id) {
                    // Fetch a single recipe by its id
                    const recipe = (await Recipe.findById(id).populate('ingredients.item')) as unknown as IPopulatedRecipe | null;
                    if (!recipe) {
                        return res.status(404).json({ error: 'Recipe not found' });
                    }
                    return res.status(200).json(recipe);
                } else {
                    // Fetch all recipes
                    const recipes: IRecipe[] = await Recipe.find().populate('ingredients.item');
                    return res.status(200).json(recipes);
                }
            } catch (error) {
                console.error(error);
                return res.status(500).json({ error: 'Error fetching recipes' });
            }

        case 'POST':
            try {
                const recipe = new Recipe(req.body);
                await recipe.save();
                return res.status(201).json(recipe);
            } catch (error) {
                console.error(error);
                return res.status(500).json({ error: 'Error creating recipe' });
            }

        case 'PUT':
            try {
                const { _id, ...rest } = req.body;
                const updatedRecipe = await Recipe.findByIdAndUpdate(_id, rest, { new: true });
                if (!updatedRecipe) {
                    return res.status(404).json({ error: 'Recipe not found' });
                }
                return res.status(200).json(updatedRecipe);
            } catch (error) {
                console.error(error);
                return res.status(500).json({ error: 'Error updating recipe' });
            }

        case 'DELETE':
            try {
                const { _id } = req.body;
                await Recipe.findByIdAndDelete(_id);
                return res.status(200).json({ message: 'Recipe deleted successfully' });
            } catch (error) {
                console.error(error);
                return res.status(500).json({ error: 'Error deleting recipe' });
            }

        default:
            return res.status(405).json({ error: 'Method not allowed' });
    }
}
