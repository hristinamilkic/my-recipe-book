import { useParams, useNavigate } from "@solidjs/router";
import { createResource } from "solid-js";
import { getRecipeById, updateRecipe } from "../api/recipes";
import RecipeForm from "../components/RecipeForm";
import { RecipeCreateData } from "../types";

const RecipeEditPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [recipe] = createResource(() => getRecipeById(+params.id));

  const handleUpdate = async (data: RecipeCreateData) => {
    await updateRecipe(+params.id, data);
    navigate(`/recipes/${params.id}`);
  };

  return (
    <div class="p-4">
      <h2 class="text-xl font-bold mb-4">Edit Recipe</h2>
      {recipe() ? (
        <RecipeForm onSubmit={handleUpdate} initialData={recipe()} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default RecipeEditPage;
