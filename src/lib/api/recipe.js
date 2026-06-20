import { serverFetch } from "../core/server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const getRecipe = async () =>{
    return serverFetch('/api/recipes');
}