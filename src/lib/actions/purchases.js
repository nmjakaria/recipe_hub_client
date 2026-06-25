import { serverMutation } from "../core/server";

export const createPurchases = async (purchasesData) => {
    return await serverMutation(`/api/recipe-purchases`, purchasesData, 'POST');
};