import { A } from "@solidjs/router";
import { Recipe } from "../types";

interface RecipeCardProps {
  recipe: Recipe;
  onDelete: (id: number) => void;
  onTogglePrivacy: (id: number, isPrivate: boolean) => void;
  onToggleFavorite: (id: number, isFavorite: boolean) => void; // Dodato
}

const RecipeCard = ({
  recipe,
  onDelete,
  onTogglePrivacy,
  onToggleFavorite,
}: RecipeCardProps) => {
  const handleToggleFavorite = async () => {
    try {
      await onToggleFavorite(recipe.id, !recipe.isFavorite);
      alert(
        `Recipe ${
          !recipe.isFavorite ? "favorited" : "unfavorited"
        } successfully!`
      );
    } catch (error) {
      alert("Failed to toggle favorite. Please try again.");
    }
  };

  const handleDelete = () => {
    const confirmed = confirm("Are you sure you want to delete this recipe?");
    if (confirmed) {
      onDelete(recipe.id);
      alert("Recipe deleted successfully!");
    }
  };

  return (
    <div class="p-4 bg-white shadow-xl rounded-xl max-w-xs md:max-w-sm lg:max-w-md mx-auto">
      <img
        src="src/assets/banana-pancake.jpg"
        alt={recipe.title}
        class="w-full h-48 object-cover rounded"
      />
      <h2 class="text-lg font-semibold mt-2">{recipe.title}</h2>
      <p class="text-gray-500 mt-1">{recipe.ingredients}</p>

      <div class="flex flex-wrap gap-2 mt-4">
        <button
          onClick={handleToggleFavorite}
          class={`hover:bg-red-700 hover:text-white transition-all duration-300 flex-1 px-1 py-1 rounded shadow ${
            recipe.isFavorite
              ? "bg-red-500 text-white"
              : "bg-gray-200 text-gray-700"
          } flex items-center justify-center`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6"
            fill={recipe.isFavorite ? "red" : "none"}
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </button>

        <button
          onClick={handleDelete}
          class="hover:bg-black hover:text-white transition-all duration-300 flex-1 bg-blue-950 text-white px-4 py-2 rounded shadow"
        >
          Delete
        </button>

        <button
          onClick={() => onTogglePrivacy(recipe.id, !recipe.isPrivate)}
          class="hover:bg-black hover:text-white transition-all duration-300 flex-1 bg-blue-950 text-white px-4 py-2 rounded shadow"
        >
          {recipe.isPrivate ? "Make Public" : "Make Private"}
        </button>

        <A
          href={`/recipes/${recipe.id}`}
          class="hover:bg-black hover:text-white transition-all duration-300 flex-1 bg-blue-950 text-white px-4 py-2 rounded shadow text-center"
        >
          View
        </A>

        <A
          href={`/recipes/${recipe.id}/edit`}
          class="hover:bg-black hover:text-white transition-all duration-300 flex-1 bg-blue-950 text-white px-4 py-2 rounded shadow text-center"
        >
          Edit
        </A>
      </div>
    </div>
  );
};

export default RecipeCard;
