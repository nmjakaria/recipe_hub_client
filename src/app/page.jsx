import CookingPaths from "@/components/CookingPaths";
import CreatorSpotlight from "@/components/CreatorSpotlight";
import FeaturedSection from "@/components/FeaturedSection";
import HeroBanner from "@/components/HeroBanner";
import PopularSection from "@/components/PopularSection";
import { getAllRecipes } from "@/lib/api/recipe";
import { Toast } from "@heroui/react";
import Image from "next/image";

export const revalidate = 60;


export default async function Home() {
  let recipes = [];
  try {

    const response = await getAllRecipes({
      next: { revalidate: 60 }
    });

    recipes = Array.isArray(response) ? response : response?.data || response?.recipes || [];
  } catch (error) {
    console.error("Failed to compile homepage data registry safely:", error);
  }

  const featuredRecipes = recipes.filter(recipe => recipe.isFeatured === true);
  const popularRecipes = [...recipes].sort((a, b) => (b.likesCount || 0) - (a.likesCount || 0)).slice(0, 4);
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <HeroBanner />
      <FeaturedSection recipes={featuredRecipes} />
      <PopularSection recipes={popularRecipes} />
      <CreatorSpotlight />
      <CookingPaths />
    </div>
  );
}
