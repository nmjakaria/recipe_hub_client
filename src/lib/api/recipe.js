import { serverFetch, serverFetchWithToken } from "../core/server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const getRecipe = async () =>{
    return serverFetch('/api/recipes');
}

export const getRecipeById = async (recipeId) => {
    return serverFetch(`/api/recipes/${recipeId}`);
}

export const getRecipeByUser = async () => {
    return serverFetchWithToken(`/api/user/my-recipes`);
}

export const getRecipeByRecipeId = async (id) => {
    return serverFetchWithToken(`/api/user/my-recipes/${id}`)
}