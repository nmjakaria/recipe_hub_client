import { serverMutation } from "../core/server"

export const updateUserBlockStatus = async (userId, isBlocked) => {
    // Wrap the boolean inside an object structure
    return serverMutation(
        `/api/users/${userId}/block`, 
        { isBlocked: Boolean(isBlocked) }, 
        'PATCH'
    );
};

/**
 * Toggles the spotlight featured state of a recipe
 */
export const updateRecipeFeaturedStatus = async (recipeId, isFeatured) => {
    return serverMutation(
        `/api/admin/recipes/${recipeId}`,
        { isFeatured: Boolean(isFeatured) },
        'PATCH'
    );
};

/**
 * Updates the moderation tracking state of a recipe (e.g., 'pending' or 'allowed')
 */
export const updateRecipeModerationStatus = async (recipeId, status) => {
    return serverMutation(
        `/api/admin/recipes/${recipeId}`,
        { status: String(status) },
        'PATCH'
    );
};