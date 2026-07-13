import { api } from "./axios";

const API_URL = import.meta.env.VITE_API_URL;

export async function getRecipes(
  getToken: () => Promise<string | null>,
  search?: string,
) {
  const token = await getToken();

  const response = await api.get(`${API_URL}/recipes`, {
    params: {
      ...(search && { search }),
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function getRecipe(
  getToken: () => Promise<string | null>,
  recipeId: string,
) {
  const token = await getToken();

  const response = await api.get(`${API_URL}/recipes/${recipeId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

// export async fucntion CreateRecipe(
//   getToken:() => Prormise<string | null>,
//   recipe: RecipeCard,
// )