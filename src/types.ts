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

export type RecipeDetail = {
    id: string,
    userId: string,
    title: string,
    description: string | null,
    instructions: string[],
    ingredients: Ingredient[],
    createdAt: string,
    updatedAt: string,
}