import axios from 'axios';
import { IRecipe } from '../../models/recipe'; // Adjust the path if necessary

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export type RecipeCreateRequest = {
    name: string;
    ingredients: Array<{
        item: string; // Assuming item is a string ID, adjust if necessary
        quantity: number;
    }>;
    // Add other properties as needed
}

// Read: Get all recipes
export const getRecipes = async (): Promise<IRecipe[]> => {
    return (await axios.get(`${apiUrl}/api/recipes`)).data;
};

// Read: Get a single recipe by its ID
export const getRecipe = async (id: string): Promise<IRecipe> => {
    return (await axios.get(`${apiUrl}/api/recipes?id=${id}`)).data;
};

// Create: Add a new recipe
export const createRecipe = async (recipe: RecipeCreateRequest): Promise<IRecipe> => {
    return (await axios.post(`${apiUrl}/api/recipes`, recipe)).data;
};

// Update: Edit an existing recipe
export const updateRecipe = async (id: string, recipe: IRecipe): Promise<IRecipe> => {
    return (await axios.put(`${apiUrl}/api/recipes/${id}`, recipe)).data;
};

// Delete: Remove a recipe
export const deleteRecipe = async (id: string): Promise<void> => {
    await axios.delete(`${apiUrl}/api/recipes/${id}`);
};
