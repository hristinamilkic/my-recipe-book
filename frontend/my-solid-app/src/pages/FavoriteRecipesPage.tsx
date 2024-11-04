import { createEffect, createResource } from "solid-js";
import FavoriteRecipes from "../components/FavoriteRecipes";
import { Recipe } from "../types";
import {
  getRecipes,
  deleteRecipe,
  toggleRecipePrivacy,
  toggleRecipeFavorite,
} from "../api/recipes";

const FavoriteRecipesPage = () => {
  const [recipes, { refetch }] = createResource(getRecipes);

  // Funkcija za brisanje recepta
  const handleDelete = async (id: number) => {
    await deleteRecipe(id);
    refetch(); // Ponovno učitaj recepte nakon brisanja
  };

  // Funkcija za prebacivanje privatnosti recepta
  const handleTogglePrivacy = async (id: number, isPrivate: boolean) => {
    await toggleRecipePrivacy(id, isPrivate);
    refetch(); // Ponovno učitaj recepte nakon promene privatnosti
  };

  // Funkcija za prebacivanje omiljenosti recepta
  const handleToggleFavorite = async (id: number, isFavorite: boolean) => {
    await toggleRecipeFavorite(id, isFavorite);
    refetch(); // Ponovno učitaj recepte nakon promene omiljenosti
  };

  return (
    <div>
      <FavoriteRecipes
        recipes={recipes() || []} // Ako nema recepata, koristi prazan niz
        onDelete={handleDelete}
        onTogglePrivacy={handleTogglePrivacy}
        onToggleFavorite={handleToggleFavorite}
      />
    </div>
  );
};

export default FavoriteRecipesPage;
