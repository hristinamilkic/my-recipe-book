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

  const isUpdate = !!initialData.id; // Provera da li je ažuriranje

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    const data = {
      title: title(),
      ingredients: ingredients(),
      instructions: instructions(),
      imageUrl: imageUrl(),
      isPrivate: isPrivate(),
    };

    try {
      await onSubmit(data);
      alert(
        isUpdate
          ? "Recipe updated successfully!"
          : "Recipe created successfully!"
      );
    } catch (error) {
      console.error("Failed to submit recipe:", error);
      alert("Failed to submit recipe. Please try again.");
    }
  };
  return (
    <div class="place-items-center">
      <form
        onSubmit={handleSubmit}
        class="w-1/2 p-4 bg-gray-100 rounded-xl shadow-xl"
      >
        <input
          type="text"
          value={title()}
          onInput={(e) => setTitle((e.target as HTMLInputElement).value)}
          placeholder="Title"
          class="w-full p-2 mb-2 border rounded-xl"
        />
        <textarea
          value={ingredients()}
          onInput={(e) =>
            setIngredients((e.target as HTMLTextAreaElement).value)
          }
          placeholder="Ingredients"
          class="w-full p-2 mb-2 border rounded-xl"
        ></textarea>
        <textarea
          value={instructions()}
          onInput={(e) =>
            setInstructions((e.target as HTMLTextAreaElement).value)
          }
          placeholder="Instructions"
          class="w-full p-2 mb-2 border rounded-xl"
        ></textarea>
        <input
          type="text"
          value={imageUrl()}
          onInput={(e) => setImageUrl((e.target as HTMLInputElement).value)}
          placeholder="Image URL"
          class="w-full p-2 mb-2 border rounded-xl"
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
          class="w-full bg-blue-950 text-white p-2 rounded-xl mt-4"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default RecipeForm;
