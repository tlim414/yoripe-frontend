import { Box, Container, Grid, Typography, CircularProgress } from "@mui/material";
import RecipeCard from "../components/recipes/RecipeCard";
import { useEffect, useState } from "react";
import { getRecipes } from "../services/recipeApi";
import { useAuth } from "@clerk/react";

type Recipe = {
    id: string;
    title: string;
    description: string | null;
    createdAt: string;
}

export default function HomePage() {
    const { getToken, isLoaded, isSignedIn } = useAuth();
    const [loading, setLoading] = useState(true);
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [search, setSearch] = useState("");

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

    function handleSearch() {
        loadRecipes();
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
                <Grid container spacing={3}>
                    {recipes.map((recipe) => (
                        // Added item breakpoints so it behaves like an Instagram explore grid
                        <Grid key={recipe.id} size={{ xs: 12, sm: 6, md: 4, }}>
                            <RecipeCard recipe={recipe} />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
}