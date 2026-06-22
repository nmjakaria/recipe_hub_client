import { serverFetchWithToken } from "../core/server";


export async function getMyFavorites() {
    try {
        return await serverFetchWithToken("/api/user/my-favorite");
    } catch (err) {
        console.error("Error gathering favorites mapping:", err);
        return [];
    }
}
