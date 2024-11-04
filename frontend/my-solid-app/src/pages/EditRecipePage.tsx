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
    <div class="p-4 place-items-center mt-10">
      <h2 class="text-4xl font-bold mb-4">Edit Recipe</h2>
      <div class="w-20 h-1 bg-blue-950 rounded-md shadow-xl mb-14"></div>
      {recipe() ? (
        <RecipeForm onSubmit={handleUpdate} initialData={recipe()} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default RecipeEditPage;
