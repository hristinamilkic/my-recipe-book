import { useParams, useNavigate } from "@solidjs/router";
import {
  getRecipeById,
  deleteRecipe,
  toggleRecipePrivacy,
} from "../api/recipes";
import { Recipe } from "../types";
import { createResource } from "solid-js";

const RecipeDetailsPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [recipe, { refetch }] = createResource<Recipe>(() =>
    getRecipeById(+params.id)
  );

  const handleDelete = async () => {
    await deleteRecipe(recipe()!.id);
    navigate("/");
  };

  const handleTogglePrivacy = async () => {
    await toggleRecipePrivacy(recipe()!.id, !recipe()!.isPrivate);
    refetch();
  };

  return (
    <div class="p-4">
      {recipe() ? (
        <>
          <h2 class="text-xl font-bold">{recipe()!.title}</h2>
          <img
            src={recipe()!.imageUrl}
            alt={recipe()!.title}
            class="w-full h-64 object-cover my-4"
          />
          <p class="text-gray-700">{recipe()!.instructions}</p>
          <button onClick={handleTogglePrivacy} class="text-yellow-500 mt-4">
            {recipe()!.isPrivate ? "Make Public" : "Make Private"}
          </button>
          <button onClick={handleDelete} class="text-red-500 mt-4 ml-4">
            Delete Recipe
          </button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default RecipeDetailsPage;
