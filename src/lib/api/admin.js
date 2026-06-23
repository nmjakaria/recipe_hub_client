import { serverFetchWithToken } from "../core/server";

export const getUserForAdmin = async () => {
    return serverFetchWithToken(`/api/users`);
}

export const getReportsForAdmin = async () => {
    return serverFetchWithToken(`/api/reports`);
}

export const getRecipeByRecipeIdForAdmin= async (id) => {
    return serverFetchWithToken(`/api/admin/recipes/${id}`)
}