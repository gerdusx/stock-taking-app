import axios from 'axios';
import { ICategory } from '../../models/category';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export type CategoryCreateRequest = {
    name: string;
}

// Read: Get all categories
export const getCategories = async (): Promise<ICategory[]> => {
    return (await axios.get(`${apiUrl}/api/categories`)).data;
};

// Read: Get a single category by its ID
export const getCategory = async (id: string): Promise<ICategory> => {
    return (await axios.get(`${apiUrl}/api/categories?id=${id}`)).data;
};

// Create: Add a new category
export const createCategory = async (category: CategoryCreateRequest): Promise<ICategory> => {
    return (await axios.post(`${apiUrl}/api/categories`, category)).data;
};

// Update: Edit an existing category
export const updateCategory = async (id: string, category: ICategory): Promise<ICategory> => {
    return (await axios.put(`${apiUrl}/api/categories/${id}`, category)).data;
};

// Delete: Remove a category
export const deleteCategory = async (id: string): Promise<void> => {
    await axios.delete(`${apiUrl}/api/categories/${id}`);
};