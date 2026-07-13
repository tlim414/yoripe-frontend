// MUI
import { Box, Card, CardContent, IconButton, Typography } from "@mui/material"

// Types
import type { RecipeSummary } from "../../types";

// Services
import { devLog } from "../../services/devlog"

type RecipeCardProps = {
    recipe: RecipeSummary,
    onClick: () => void,
}

export default function RecipeCard({
    recipe,
    onClick,
}: RecipeCardProps) {


    const handleCardClick = () => {
        devLog("Recipe card clicked");
        onClick();
    }

    return (
        <Card
            onClick={handleCardClick}
            sx={{
                height: '100%',
                borderRadius: 3,
            }}
        >
            {/* Add image later */}
            < CardContent >
                <Typography variant="h6" sx={{ fontWeight: "600", color: "text.primary" }}>
                    {recipe.title}
                </Typography>

                <Typography variant="body1">
                    {recipe.description}
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "end" }}>
                    <Typography variant="caption" sx={{ color: "text.secondary" }}>
                        {new Date(recipe.createdAt).toLocaleDateString("en-ZA")}
                    </Typography>
                </Box>
            </CardContent >
        </Card >
    )
}