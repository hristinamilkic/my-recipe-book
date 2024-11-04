export interface Recipe {
  id: number;
  title: string;
  ingredients: string;
  instructions: string;
  isPrivate: boolean;
  imageUrl: string;
  isFavorite: boolean;
  privacyToken: string;
}

export interface RecipeCreateData {
  title: string;
  ingredients: string;
  instructions: string;
  isPrivate?: boolean;
  imageUrl?: string;
  isFavorite?: boolean;
}
