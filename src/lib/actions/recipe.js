'use server'

import { serverMutation } from "../core/server"

export const createRecipe = async (recipeData) => {
    return serverMutation('/api/recipes', recipeData)
}