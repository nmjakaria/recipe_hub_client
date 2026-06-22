import { serverMutation } from "../core/server"

export const updateUserBlockStatus = async (userId, isBlocked) => {
    // Wrap the boolean inside an object structure
    return serverMutation(
        `/api/users/${userId}/block`, 
        { isBlocked: Boolean(isBlocked) }, 
        'PATCH'
    );
};