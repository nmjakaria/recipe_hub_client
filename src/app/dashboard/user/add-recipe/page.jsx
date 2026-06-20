// app/dashboard/user/add-recipe/page.jsx
import React from 'react';
import { getUserSession } from "@/lib/core/session";
import AddRecipeForm from '@/components/dashboard/AddRecipeForm';

const AddRecipePage = async () => {
    // Securely resolve user data parameters directly on the server
    const user = await getUserSession();
    
    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Create Recipe</h1>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">Add a new culinary item directly onto your system catalog.</p>
            </div>

            {/* Mount client interface framework passing retrieved server session metadata */}
            <AddRecipeForm user={user} />
        </div>
    );
};

export default AddRecipePage;