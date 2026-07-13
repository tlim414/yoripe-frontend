import { useState } from "react";

// MUI
import { Box, Container } from "@mui/material";

// Components
import NavBar from "../components/NavBar";
import CreateRecipe from "../components/recipes/CreateRecipe";
import RecipesPage from "./RecipesPage";




export default function HomePage() {
    const [isNewRecipeModalOpen, setIsNewRecipeMomdalOpen] = useState(false);



    return (
        <Container maxWidth='lg' >
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
            }}>
                <NavBar onNewClick={() => { setIsNewRecipeMomdalOpen(true) }} />
                <RecipesPage />
            </Box>
            <CreateRecipe isOpen={isNewRecipeModalOpen}
                onClose={() => setIsNewRecipeMomdalOpen(false)}
                onCreated={() => { }} />
        </Container>
    );
}
