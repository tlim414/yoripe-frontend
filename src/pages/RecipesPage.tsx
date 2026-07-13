import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import type { RecipeSummary } from "../types";

// MUI
import { Box, Container, Grid, Typography, CircularProgress } from "@mui/material";

// Clerk
import { useAuth } from "@clerk/react";

// Services
import { devLog } from "../services/devlog";
import { getRecipe, getRecipes } from "../services/recipeApi";

// Components
import RecipeCard from "../components/recipes/RecipeCard";
import RecipeDetails from "../components/recipes/RecipeDetails";


export default function RecipesPage() {
    const { getToken, isLoaded, isSignedIn } = useAuth();
    const [loading, setLoading] = useState(true);
    const [recipes, setRecipes] = useState<RecipeSummary[]>([]);
    const [selectedRecipe, setSelectedRecipe] = useState<any | null>(null);
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get("search") || "";


    // API Function Calls
    async function loadRecipes() {
        if (!isLoaded || !isSignedIn) return;

        try {
            setLoading(true);
            const data = await getRecipes(getToken, searchQuery);
            setRecipes(data);
        } catch (error) {
            console.error("Failed to load recipes:", error);
        } finally {
            setLoading(false);
        }
    }

    async function loadRecipeDetail(recipeId: string) {
        if (!isLoaded || !isSignedIn) return;

        try {
            setLoading(true);

            const data = await getRecipe(getToken, recipeId);
            devLog(data);
            setSelectedRecipe(data);
        } catch (error) {
            console.error("Failed to load recipe:", error);
        } finally {
            setLoading(false);
        }
    }

    // API Call Helpers
    function handleRecipeSelect(recipeId: string) {
        loadRecipeDetail(recipeId);

    }

    useEffect(() => {
        loadRecipes();
    }, [isLoaded, isSignedIn, searchQuery]);

    if (!isLoaded || loading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '40vh',
                    width: '100%'
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 6, width: '100%' }}>
            {recipes.length === 0 ? (
                <Typography color="text.secondary">No recipes found.</Typography>
            ) : (
                <Box>
                    <Grid container spacing={3}>
                        {recipes.map((recipe) => (
                            <Grid key={recipe.id} size={{ xs: 12, sm: 6, md: 4, }}>
                                <RecipeCard
                                    recipe={recipe}
                                    onClick={() => handleRecipeSelect(recipe.id)}
                                />
                            </Grid>
                        ))}
                    </Grid>
                    <RecipeDetails
                        isOpen={Boolean(selectedRecipe)}
                        recipe={selectedRecipe}
                        onClose={() => setSelectedRecipe(null)}
                    />
                </Box>
            )}
        </Box>
    )
}