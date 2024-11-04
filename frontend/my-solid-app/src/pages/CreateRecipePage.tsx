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
    <div class="p-4">
      <h2 class="text-xl font-bold mb-4">Create New Recipe</h2>
      <RecipeForm onSubmit={handleCreate} />
    </div>
  );
};

export default RecipeCreatePage;
