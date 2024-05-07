import { ID, Client, Account, Databases, Storage, Query } from "appwrite";

export const client = new Client();
client.setEndpoint(import.meta.env.VITE_APPWRITE_API_ENDPOINT);
client.setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

export { ID };
export { Query };
export const account = new Account(client);
export const databases = new Databases(client);
export const storages = new Storage(client);
export const databaseId = import.meta.env.VITE_APPWRITE_DATABASE_ID;
export const storageId = import.meta.env.VITE_APPWRITE_STORAGE_ID;
export const collectionId = import.meta.env
  .VITE_APPWRITE_MESSAGES_COLLECTION_ID;
