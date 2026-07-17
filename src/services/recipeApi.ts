import type { CreateRecipePayload, Recipe, RecipeSummary } from "../types";
import { api } from "./axios";

const API_URL = import.meta.env.VITE_API_URL;


// CREATE
export async function createRecipe(
  getToken: () => Promise<string | null>,
  recipePayload: CreateRecipePayload,
) {
  const token = await getToken();

  const response = await api.post(`${API_URL}/recipes`, recipePayload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}


// READ
export async function getRecipeList(
  getToken: () => Promise<string | null>,
  search?: string,
) : Promise<RecipeSummary[]>{
  const token = await getToken();

  const response = await api.get(`${API_URL}/recipes`, {
    params: {
      ...(search && { search }),
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data as RecipeSummary[];
}

export async function getRecipe(
  getToken: () => Promise<string | null>,
  recipeId: string,
) : Promise<Recipe> {
  const token = await getToken();

  const response = await api.get(`${API_URL}/recipes/${recipeId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data as Recipe;
}

// UPDATE


// DELETE
export async function deleteRecipe(
  getToken: () => Promise<string | null>,
  recipeId: string,
) {
  const token = await getToken();

  const response = await api.delete(`${API_URL}/recipes/${recipeId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}