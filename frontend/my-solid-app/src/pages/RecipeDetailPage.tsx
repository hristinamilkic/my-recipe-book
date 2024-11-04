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
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this recipe?"
    );
    if (confirmDelete) {
      await deleteRecipe(recipe()!.id);
      alert("Recipe deleted successfully!");
      navigate("/");
    }
  };

  const handleTogglePrivacy = async () => {
    await toggleRecipePrivacy(recipe()!.id, !recipe()!.isPrivate);
    refetch();
  };

  return (
    <div class="place-items-center">
      <h1 class="text-3xl mt-10">Recipe Details</h1>
      <div class="p-4 w-1/2 bg-gray-100 mt-10 rounded-xl">
        {recipe() ? (
          <>
            <h2 class="text-xl font-bold">{recipe()!.title}</h2>
            <img
              src="src/assets/carbonara.jpg"
              alt={recipe()!.title}
              class="w-full h-64 object-cover my-4"
            />
            <p class="text-gray-700">{recipe()!.instructions}</p>
            <div class="mt-3">
              <button
                onClick={handleTogglePrivacy}
                class="hover:bg-black hover:text-white transition-all duration-300 flex-1 bg-blue-950 text-white px-4 py-2 rounded shadow-xl mr-2"
              >
                {recipe()!.isPrivate ? "Make Public" : "Make Private"}
              </button>
              <button
                onClick={handleDelete}
                class="hover:bg-black hover:text-white transition-all duration-300 flex-1 bg-blue-950 text-white px-4 py-2 rounded shadow-xl"
              >
                Delete
              </button>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default RecipeDetailsPage;
