import axios from "axios";
import { Recipe, RecipeCreateData } from "../types/index";

const API_URL = import.meta.env.VITE_API_URL;

// Dohvata sve recepte sa backend-a
export const getRecipes = async (): Promise<Recipe[]> => {
  const response = await axios.get(`${API_URL}/recipes`);
  console.log("Fetched recipes:", response.data);
  return response.data;
};

// Dohvata recept po ID-ju
export const getRecipeById = async (id: number): Promise<Recipe> => {
  const response = await axios.get(`${API_URL}/recipes/${id}`);
  return response.data;
};

// Dohvata recept putem privacy_token-a
export const getRecipeByToken = async (token: string): Promise<Recipe> => {
  const response = await axios.get(`${API_URL}/recipes/token/${token}`);
  return response.data;
};

// Kreira novi recept
export const createRecipe = async (data: RecipeCreateData): Promise<Recipe> => {
  const response = await axios.post(`${API_URL}/recipes`, data);
  return response.data;
};

// Ažurira postojeći recept
export const updateRecipe = async (
  id: number,
  data: Partial<RecipeCreateData>
): Promise<void> => {
  await axios.put(`${API_URL}/recipes/${id}`, data);
};

// Togluje privatnost recepta
export const toggleRecipePrivacy = async (
  id: number,
  isPrivate: boolean
): Promise<void> => {
  await axios.put(`${API_URL}/recipes/${id}/privacy`, {
    is_private: isPrivate,
  });
};

// Briše recept po ID-ju
export const deleteRecipe = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/recipes/${id}`);
};
