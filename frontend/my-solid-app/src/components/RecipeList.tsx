import { Component, For } from "solid-js";
import RecipeCard from "./RecipeCard";
import { Recipe } from "../types";

interface RecipeListProps {
  recipes: Recipe[];
  onDelete: (id: number) => void;
  onTogglePrivacy: (id: number, isPrivate: boolean) => void;
}

const RecipeList: Component<RecipeListProps> = (props) => (
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
    <For each={props.recipes}>
      {(recipe) => (
        <RecipeCard
          recipe={recipe}
          onDelete={props.onDelete}
          onTogglePrivacy={props.onTogglePrivacy}
        />
      )}
    </For>
  </div>
);

export default RecipeList;
