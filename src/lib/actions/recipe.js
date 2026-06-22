'use server'

import { serverMutation } from "../core/server"

export const createRecipe = async (recipeData) => {
    return serverMutation('/api/recipes', recipeData)
}

export const createLikeUnlike = async (recipeId) => {
    return serverMutation(`/api/recipes/${recipeId}/like`);
};

export const createFavorite = async (recipeId, favoriteRecipeData) => {
    return serverMutation(`/api/recipes/${recipeId}/favorite`, { favoriteRecipeData })
}

export const createRecipeReport = async (recipeId, reportReason) => {
    return serverMutation(`/api/recipes/${recipeId}/report`, { reason: reportReason })
}

export const updateRecipe = async (id, updatedData) => {
    return serverMutation(`/api/recipes/${id}`, updatedData, 'PATCH');
};

export const deleteRecipe = async (id) => {
    return serverMutation(`/api/recipes/${id}`, {}, 'DELETE');
};


export const unfavoriteRecipe = async (favoriteId) => {
    return serverMutation(`/api/user/my-favorite/${favoriteId}`, {}, 'DELETE');
}