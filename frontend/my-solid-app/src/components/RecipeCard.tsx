import { A } from "@solidjs/router";
import { Recipe } from "../types";

interface RecipeCardProps {
  recipe: Recipe;
  onDelete: (id: number) => void;
  onTogglePrivacy: (id: number, isPrivate: boolean) => void;
}

const RecipeCard = ({ recipe, onDelete, onTogglePrivacy }: RecipeCardProps) => (
  <div class="p-4 bg-white shadow-md rounded-lg">
    <img
      src={recipe.imageUrl}
      alt={recipe.title}
      class="w-full h-48 object-cover rounded"
    />
    <h2 class="text-lg font-semibold mt-2">{recipe.title}</h2>
    <p class="text-gray-500">{recipe.ingredients}</p>

    <div class="flex mt-4 space-x-2">
      <A href={`/recipes/${recipe.id}`} class="text-blue-500">
        View
      </A>
      <A href={`/recipes/${recipe.id}/edit`} class="text-green-500">
        Edit
      </A>

      <button onClick={() => onDelete(recipe.id)} class="text-red-500">
        Delete
      </button>
      <button
        onClick={() => onTogglePrivacy(recipe.id, !recipe.isPrivate)}
        class="text-yellow-500"
      >
        {recipe.isPrivate ? "Make Public" : "Make Private"}
      </button>
    </div>
  </div>
);

export default RecipeCard;
