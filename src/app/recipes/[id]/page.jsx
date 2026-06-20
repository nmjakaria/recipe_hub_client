/* eslint-disable react-hooks/error-boundaries */
// app/recipes/[id]/page.jsx
import RecipeDetailsView from '@/components/RecipeDetailsView';
import { getRecipeById } from '@/lib/api/recipe'; // Adjust import path if needed
import { notFound } from 'next/navigation';

export default async function RecipePage({ params }) {
    // Await params to extract the dynamic ID safely
    const resolvedParams = await params;
    const id = resolvedParams.id;

    try {
        // Execute your explicit API call matching the Express backend
        const recipe = await getRecipeById(id);

        // If MongoDB doesn't find a matching entry, render the Next.js 404 fallback page
        if (!recipe) {
            return notFound();
        }

        // Forward the specific entry down to the interactive view
        return <RecipeDetailsView recipe={recipe} />;
    } catch (error) {
        console.error("Failed to compile recipe details context:", error);
        
        // Prevents server crashing if an invalid MongoDB ObjectId string is supplied
        return notFound();
    }
}