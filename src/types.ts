import type { SEARCH_TYPE } from "./constants/routes"

export type Ingredient = {
    id: string
    name: string,
    amount: string,
    unit: string,
    recipeId: string,   
}
export type RecipeSummary = {
    id: string,
    title: string,
    description: string | null,
    createdAt: string,
}

export type Recipe = {
    id: string,
    userId: string,
    title: string,
    description: string | null,
    instructions: string[],
    ingredients: Ingredient[],
    createdAt: string,
    updatedAt: string,
}

export type CreateRecipeIngredientPayload = {
    name: string,
    amount: number,
    unit: string,
}

export type CreateRecipePayload = {
    title: string,
    description: string,
    instructions: string[],
    ingredients: CreateRecipeIngredientPayload[],
}

export type SearchType = typeof SEARCH_TYPE[keyof typeof SEARCH_TYPE];
