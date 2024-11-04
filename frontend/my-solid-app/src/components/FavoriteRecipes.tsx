// src/components/FavoriteRecipes.tsx
import { Recipe } from "../types";
import RecipeCard from "./RecipeCard";

interface FavoriteRecipesProps {
  recipes: Recipe[];
  onDelete: (id: number) => void;
  onTogglePrivacy: (id: number, isPrivate: boolean) => void;
  onToggleFavorite: (id: number, isFavorite: boolean) => void;
}

const FavoriteRecipes = ({
  recipes,
  onDelete,
  onTogglePrivacy,
  onToggleFavorite,
}: FavoriteRecipesProps) => {
  // Filtriramo recepte koji su omiljeni
  const favoriteRecipes = recipes.filter((recipe) => recipe.isFavorite);

  return (
    <div class="p-4 place-items-center justify-center">
      <h1 class="text-2xl font-bold mb-4">My Favorite Recipes</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center">
        {favoriteRecipes.length > 0 ? (
          favoriteRecipes.map((recipe) => (
            <RecipeCard
              recipe={recipe}
              onDelete={onDelete}
              onTogglePrivacy={onTogglePrivacy}
              onToggleFavorite={onToggleFavorite}
            />
          ))
        ) : (
          <p>No favorite recipes found.</p>
        )}
      </div>
    </div>
  );
};

export default FavoriteRecipes;
