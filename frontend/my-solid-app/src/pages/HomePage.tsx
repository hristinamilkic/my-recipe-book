import { createResource } from "solid-js";
import RecipeList from "../components/RecipeList";
import { getRecipes, deleteRecipe, toggleRecipePrivacy } from "../api/recipes";

const HomePage = () => {
  const [recipes, { refetch }] = createResource(getRecipes);

  const handleDelete = async (id: number) => {
    await deleteRecipe(id);
    refetch();
  };

  const handleTogglePrivacy = async (id: number, isPrivate: boolean) => {
    await toggleRecipePrivacy(id, isPrivate);
    refetch();
  };

  return (
    <div class="p-4">
      <h2 class="text-xl font-bold mb-4">All Recipes</h2>
      <RecipeList
        recipes={recipes() || []}
        onDelete={handleDelete}
        onTogglePrivacy={handleTogglePrivacy}
      />
    </div>
  );
};

export default HomePage;
