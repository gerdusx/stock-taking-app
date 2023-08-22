import axios from 'axios';
import { IStockItem } from '../../models/stockItem'; // Adjust the path if necessary

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export type StockItemCreateRequest = {
    name: string;
    unit: string; // Assuming unit is a string, adjust if necessary
    quantity: number;
    // Add other properties as needed
}

// Read: Get all stock items
export const getStockItems = async (): Promise<IStockItem[]> => {
    return (await axios.get(`${apiUrl}/api/stockitems`)).data;
};

// Read: Get a single stock item by its ID
export const getStockItem = async (id: string): Promise<IStockItem> => {
    return (await axios.get(`${apiUrl}/api/stockitems?id=${id}`)).data;
};

// Create: Add a new stock item
export const createStockItem = async (stockItem: StockItemCreateRequest): Promise<IStockItem> => {
    return (await axios.post(`${apiUrl}/api/stockitems`, stockItem)).data;
};

// Update: Edit an existing stock item
export const updateStockItem = async (id: string, stockItem: IStockItem): Promise<IStockItem> => {
    return (await axios.put(`${apiUrl}/api/stockitems/${id}`, stockItem)).data;
};

// Delete: Remove a stock item
export const deleteStockItem = async (id: string): Promise<void> => {
    await axios.delete(`${apiUrl}/api/stockitems/${id}`);
};
