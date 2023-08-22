import axios from 'axios';
import { IUser } from '../../models/user'; // Adjust the path if necessary

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export type UserCreateRequest = {
    username: string;
    password: string;
    email: string;
    // Add other properties as needed
}

// Read: Get all users
export const getUsers = async (): Promise<IUser[]> => {
    return (await axios.get(`${apiUrl}/api/users`)).data;
};

// Read: Get a single user by its ID
export const getUser = async (id: string): Promise<IUser> => {
    return (await axios.get(`${apiUrl}/api/users?id=${id}`)).data;
};

// Create: Add a new user
export const createUser = async (user: UserCreateRequest): Promise<IUser> => {
    return (await axios.post(`${apiUrl}/api/users`, user)).data;
};

// Update: Edit an existing user
export const updateUser = async (id: string, user: IUser): Promise<IUser> => {
    return (await axios.put(`${apiUrl}/api/users/${id}`, user)).data;
};

// Delete: Remove a user
export const deleteUser = async (id: string): Promise<void> => {
    await axios.delete(`${apiUrl}/api/users/${id}`);
};

// If you have authentication methods, you can add functions for login, logout, etc.
