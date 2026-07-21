// Clerk
import { useAuth } from "@clerk/react";
// UseQuery
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Services
import { createRecipe, deleteRecipe, getRecipe, getRecipeList, updateRecipe } from "../services/recipeApi";

// Types
import type { RecipePayload, SearchType } from "../types/types";

// CREATE
export function useCreateRecipe() {
    const { getToken } = useAuth();
    const queryClient = useQueryClient();

    return useMutation({
        // 1. Fire the POST request with the form data
        mutationFn: (newRecipe: RecipePayload) => createRecipe(getToken, newRecipe),

        // 2. On success, invalidate the list cache so the new recipe shows up
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["recipeList"] });
        },
    });
}

// READ
export function useRecipeList(searchQuery: string, searchBy: SearchType) {
    const { getToken, isLoaded, isSignedIn } = useAuth();

    return useQuery({
        queryKey: ["recipeList", searchQuery, searchBy],
        // Call api function to get recipes
        queryFn: () => getRecipeList(getToken, searchQuery, searchBy),
        // Only allow the api to get called when a used is signed in and loaded
        enabled: isLoaded && isSignedIn,
    });
}

export function useRecipe(id: string | null) {
    const { getToken, isLoaded, isSignedIn } = useAuth();

    return useQuery({
        queryKey: ["recipe", id],
        queryFn: () => getRecipe(getToken, id!),
        enabled: isLoaded && isSignedIn && id !== null,
    });
}

// UPDATE
export function useUpdateRecipe() {
    const { getToken } = useAuth();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ recipeId, updatedRecipe }: { recipeId: string, updatedRecipe: RecipePayload }) => updateRecipe(getToken, recipeId, updatedRecipe),
        onSuccess: (_data, { recipeId }) => {
            queryClient.invalidateQueries({ queryKey: ["recipeList"] });
            queryClient.invalidateQueries({ queryKey: ["recipe", recipeId] });
        },
    });
}

// DELETE
export function useDeleteRecipe() {
    const { getToken } = useAuth();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (recipeId: string) => deleteRecipe(getToken, recipeId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["recipeList"] });
        },
    });
}