import type { FORM_MODE } from '../constants/recipes';
import type { SEARCH_TYPE } from '../constants/routes';

export type Ingredient = {
  id: string;
  name: string;
  amount: string;
  unit: string;
  recipeId: string;
};
export type RecipeSummary = {
  id: string;
  title: string;
  description: string | null;
  createdAt: string;
};

export type Recipe = {
  id: string;
  userId: string;
  title: string;
  description: string | null;
  instructions: string[];
  ingredients: Ingredient[];
  createdAt: string;
  updatedAt: string;
};

export type IngredientPayload = {
  name: string;
  amount: number;
  unit: string;
};

export type RecipePayload = {
  title: string;
  description: string;
  instructions: string[];
  ingredients: IngredientPayload[];
};

export type SearchType = (typeof SEARCH_TYPE)[keyof typeof SEARCH_TYPE];

export type FormMode = (typeof FORM_MODE)[keyof typeof FORM_MODE];

export type ExtractedIngredient = {
  name: string;
  amount: string;
  unit: string;
};

export type ExtractedRecipe = {
  title: string;
  description: string;
  instructions: string[];
  ingredients: ExtractedIngredient[];
};
