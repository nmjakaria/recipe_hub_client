'use server'

import { serverMutation } from "../core/server"

export const createRecipe = async (recipeData) => {
    return serverMutation('/api/recipes', recipeData)
}

export const createLikeUnlike = async (recipeId) => {
    return serverMutation(`/api/recipes/${recipeId}/like`);
};