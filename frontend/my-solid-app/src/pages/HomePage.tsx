import { createSignal, createResource } from "solid-js";
import RecipeList from "../components/RecipeList";
import {
  getRecipes,
  deleteRecipe,
  toggleRecipePrivacy,
  toggleRecipeFavorite,
} from "../api/recipes";

const HomePage = () => {
  const [recipes, { refetch }] = createResource(getRecipes);
  const [searchTerm, setSearchTerm] = createSignal("");

  const filteredRecipes = () => {
    return recipes()?.filter((recipe) =>
      recipe.title.toLowerCase().includes(searchTerm().toLowerCase())
    );
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteRecipe(id);
      refetch();
    } catch (error) {
      alert("Failed to delete recipe. Please try again.");
    }
  };

  const handleTogglePrivacy = async (id: number, isPrivate: boolean) => {
    try {
      await toggleRecipePrivacy(id, isPrivate);
      refetch();
    } catch (error) {
      alert("Failed to toggle privacy. Please try again.");
    }
  };

  const handleToggleFavorite = async (id: number, isFavorite: boolean) => {
    try {
      await toggleRecipeFavorite(id, isFavorite);
      refetch();
    } catch (error) {
      alert("Failed to toggle favorite. Please try again.");
    }
  };

  return (
    <div class="p-4 mt-8">
      <div class="justify-center place-items-center mb-8">
        <h2 class="text-4xl font-bold mb-4">All Recipes</h2>
        <div class="w-20 h-1 bg-blue-950 rounded-md shadow-xl"></div>
      </div>
      <input
        type="text"
        placeholder="Search recipes..."
        value={searchTerm()}
        onInput={(e) => setSearchTerm((e.target as HTMLInputElement).value)}
        class="w-full p-2 mb-4 border rounded-md"
      />

      <RecipeList
        recipes={filteredRecipes() || []} // Filtrirani recepti
        onDelete={handleDelete}
        onTogglePrivacy={handleTogglePrivacy}
        onToggleFavorite={handleToggleFavorite}
      />
    </div>
  );
};

export default HomePage;
