import axios from 'axios';
import { IStockTake } from '../../models/stockTake'; // Adjust the path if necessary

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export type StockTakeCreateRequest = {
    date: Date;
    items: Array<{
        item: string; // Assuming item is a string ID, adjust if necessary
        quantity: number;
    }>;
    // Add other properties as needed
}

// Read: Get all stock take entries
export const getStockTakes = async (): Promise<IStockTake[]> => {
    return (await axios.get(`${apiUrl}/api/stocktakes`)).data;
};

// Read: Get a single stock take entry by its ID
export const getStockTake = async (id: string): Promise<IStockTake> => {
    return (await axios.get(`${apiUrl}/api/stocktakes?id=${id}`)).data;
};

// Create: Add a new stock take entry
export const createStockTake = async (stockTake: StockTakeCreateRequest): Promise<IStockTake> => {
    return (await axios.post(`${apiUrl}/api/stocktakes`, stockTake)).data;
};

// Update: Edit an existing stock take entry
export const updateStockTake = async (id: string, stockTake: IStockTake): Promise<IStockTake> => {
    return (await axios.put(`${apiUrl}/api/stocktakes/${id}`, stockTake)).data;
};

// Delete: Remove a stock take entry
export const deleteStockTake = async (id: string): Promise<void> => {
    await axios.delete(`${apiUrl}/api/stocktakes/${id}`);
};
