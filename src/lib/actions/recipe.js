'use server'

import { serverMutation } from "../core/server"

export const createRecipe = async (recipeData) => {
    return serverMutation('/api/recipes', recipeData)
}

export const createLikeUnlike = async (recipeId) => {
    return serverMutation(`/api/recipes/${recipeId}/like`);
};

export const createFavorite = async (recipeId, recipeName)  => {
    return serverMutation(`/api/recipes/${recipeId}/favorite`, { recipeName })
}

export const createRecipeReport = async (recipeId, reportReason) => {
    return serverMutation(`/api/recipes/${recipeId}/report`, { reason: reportReason })
}