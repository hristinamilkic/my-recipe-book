import { useNavigate } from "@solidjs/router";
import RecipeForm from "../components/RecipeForm";
import { createRecipe } from "../api/recipes";
import { RecipeCreateData } from "../types";

const RecipeCreatePage = () => {
  const navigate = useNavigate();

  const handleCreate = async (data: RecipeCreateData) => {
    await createRecipe(data);
    navigate("/");
  };

  return (
    <div class="p-4 mt-10 place-items-center">
      <h2 class="text-4xl font-bold mb-4">Create New Recipe</h2>
      <div class="w-20 h-1 bg-blue-950 rounded-md shadow-xl mb-14"></div>
      <RecipeForm onSubmit={handleCreate} />
    </div>
  );
};

export default RecipeCreatePage;
