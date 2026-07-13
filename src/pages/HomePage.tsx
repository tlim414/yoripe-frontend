import { Box, Container, Grid, Typography, CircularProgress } from "@mui/material";
import RecipeCard from "../components/recipes/RecipeCard";
import { useEffect, useState } from "react";
import { getRecipe, getRecipes } from "../services/recipeApi";
import { useAuth } from "@clerk/react";
import RecipeDetails from "../components/recipes/RecipeDetails";
import type { RecipeSummary } from "../types";
import { devLog } from "../services/devlog";


export default function HomePage() {
    const { getToken, isLoaded, isSignedIn } = useAuth();
    const [loading, setLoading] = useState(true);
    const [recipes, setRecipes] = useState<RecipeSummary[]>([]);
    const [search, setSearch] = useState("");

    const [selectedRecipe, setSelectedRecipe] = useState<any | null>(null);

    // API Function Calls
    async function loadRecipes() {
        if (!isLoaded || !isSignedIn) return;

        try {
            setLoading(true);
            // Pass the search state here so your API actually uses it!
            const data = await getRecipes(getToken, search);
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
    function handleSearch() {
        loadRecipes();
    }

    function handleRecipeSelect(recipeId: string) {
        loadRecipeDetail(recipeId);

    }

    useEffect(() => {
        loadRecipes();
    }, [isLoaded, isSignedIn]);

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