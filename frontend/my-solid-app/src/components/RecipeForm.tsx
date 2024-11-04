import { createSignal } from "solid-js";
import { Recipe, RecipeCreateData } from "../types";

interface RecipeFormProps {
  onSubmit: (data: RecipeCreateData) => void;
  initialData?: Partial<Recipe>;
}

const RecipeForm = ({ onSubmit, initialData = {} }: RecipeFormProps) => {
  const [title, setTitle] = createSignal(initialData.title || "");
  const [ingredients, setIngredients] = createSignal(
    initialData.ingredients || ""
  );
  const [instructions, setInstructions] = createSignal(
    initialData.instructions || ""
  );
  const [imageUrl, setImageUrl] = createSignal(initialData.imageUrl || "");
  const [isPrivate, setIsPrivate] = createSignal(
    initialData.isPrivate || false
  );

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    onSubmit({
      title: title(),
      ingredients: ingredients(),
      instructions: instructions(),
      imageUrl: imageUrl(),
      isPrivate: isPrivate(),
    });
  };

  return (
    <form onSubmit={handleSubmit} class="p-4 bg-gray-50 rounded-lg">
      <input
        type="text"
        value={title()}
        onInput={(e) => setTitle((e.target as HTMLInputElement).value)}
        placeholder="Title"
        class="w-full p-2 mb-2 border rounded"
      />
      <textarea
        value={ingredients()}
        onInput={(e) => setIngredients((e.target as HTMLTextAreaElement).value)}
        placeholder="Ingredients"
        class="w-full p-2 mb-2 border rounded"
      ></textarea>
      <textarea
        value={instructions()}
        onInput={(e) =>
          setInstructions((e.target as HTMLTextAreaElement).value)
        }
        placeholder="Instructions"
        class="w-full p-2 mb-2 border rounded"
      ></textarea>
      <input
        type="text"
        value={imageUrl()}
        onInput={(e) => setImageUrl((e.target as HTMLInputElement).value)}
        placeholder="Image URL"
        class="w-full p-2 mb-2 border rounded"
      />
      <label class="flex items-center mt-2">
        <input
          type="checkbox"
          checked={isPrivate()}
          onChange={() => setIsPrivate(!isPrivate())}
          class="mr-2"
        />
        Private Recipe
      </label>
      <button
        type="submit"
        class="w-full bg-blue-500 text-white p-2 rounded mt-4"
      >
        Save
      </button>
    </form>
  );
};

export default RecipeForm;
