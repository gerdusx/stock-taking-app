import axios from 'axios';
import { IStockReceive } from '../../models/stockReceive'; // Adjust the path if necessary

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export type StockReceivedCreateRequest = {
    date: Date;
    items: Array<{
        item: string; // Assuming item is a string ID, adjust if necessary
        quantity: number;
    }>;
    // Add other properties as needed
}

// Read: Get all stock received entries
export const getStockReceivedEntries = async (): Promise<IStockReceive[]> => {
    return (await axios.get(`${apiUrl}/api/stockreceived`)).data;
};

// Read: Get a single stock received entry by its ID
export const getStockReceived = async (id: string): Promise<IStockReceive> => {
    return (await axios.get(`${apiUrl}/api/stockreceived?id=${id}`)).data;
};

// Create: Add a new stock received entry
export const createStockReceived = async (stockReceived: StockReceivedCreateRequest): Promise<IStockReceive> => {
    return (await axios.post(`${apiUrl}/api/stockreceived`, stockReceived)).data;
};

// Update: Edit an existing stock received entry
export const updateStockReceived = async (id: string, stockReceived: IStockReceive): Promise<IStockReceive> => {
    return (await axios.put(`${apiUrl}/api/stockreceived/${id}`, stockReceived)).data;
};

// Delete: Remove a stock received entry
export const deleteStockReceived = async (id: string): Promise<void> => {
    await axios.delete(`${apiUrl}/api/stockreceived/${id}`);
};
