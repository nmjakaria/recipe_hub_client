import { serverFetch, serverFetchWithToken } from "../core/server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export async function getRecipes({ category, cuisineType, page = 1, limit = 8 } = {}) {
    const params = new URLSearchParams();

    if (category) params.append("category", category);
    if (cuisineType) params.append("cuisineType", cuisineType);
    params.append("page", page.toString());
    params.append("limit", limit.toString());

    try {
        // Construct the path with query parameters and pass it directly
        const path = `/api/recipes?${params.toString()}`;
        return await serverFetch(path);
    } catch (err) {
        console.error("Failed to fetch recipes through serverFetch:", err);
        // Return fallback schema so your page component doesn't break
        return { recipes: [], pagination: { totalPages: 1, currentPage: 1, totalCount: 0 } };
    }
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

export const getAllRecipes = async () => {
    return serverFetch(`/api/recipes`);
}