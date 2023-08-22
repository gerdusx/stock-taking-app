import axios from 'axios';
import { IUnit } from '../../models/unit'; // Adjust the path if necessary

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export type UnitCreateRequest = {
    name: string; // Add other properties as needed
}

// Read: Get all units
export const getUnits = async (): Promise<IUnit[]> => {
    return (await axios.get(`${apiUrl}/api/units`)).data;
};

// Read: Get a single unit by its ID
export const getUnit = async (id: string): Promise<IUnit> => {
    return (await axios.get(`${apiUrl}/api/units?id=${id}`)).data;
};

// Create: Add a new unit
export const createUnit = async (unit: UnitCreateRequest): Promise<IUnit> => {
    return (await axios.post(`${apiUrl}/api/units`, unit)).data;
};

// Update: Edit an existing unit
export const updateUnit = async (id: string, unit: IUnit): Promise<IUnit> => {
    return (await axios.put(`${apiUrl}/api/units/${id}`, unit)).data;
};

// Delete: Remove a unit
export const deleteUnit = async (id: string): Promise<void> => {
    await axios.delete(`${apiUrl}/api/units/${id}`);
};
