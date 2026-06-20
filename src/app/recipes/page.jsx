import RecipeCard from '@/components/RecipeCard';
import { getRecipe } from '@/lib/api/recipe';
import React from 'react';

const BrowseRecipePage = async () => {
    const recipes = await getRecipe()
    console.log(recipes)
    return (
        <div>
            <h1>Explore Recipes</h1>
            <p>Discover your next favorite dish with our advanced filters</p>
            <RecipeCard recipes={recipes} />
        </div>
    );
};

export default BrowseRecipePage;