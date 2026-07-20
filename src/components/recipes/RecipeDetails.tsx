// MUI
import { Box, Grid, Typography } from "@mui/material";
import type { Recipe } from "../../types/types";



type RecipeViewProps = {
    recipe: Recipe,
}
export default function RecipeDetails({
    recipe,
} : RecipeViewProps) {
    return (<Box
        sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
        }}
    >
        <Typography variant="body1">
            {recipe.description}
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: "600", color: "text.primary" }}>
            Ingredients
        </Typography>
        <Box sx={{ width: "100%", maxWidth: 500 }}>
            {recipe.ingredients.map((ingredient, index) => (
                <Grid container key={index}>
                    <Grid size={11}>
                        <Typography>
                            {`${"• "}${ingredient.name}`}
                        </Typography>
                    </Grid>
                    <Grid size={1}>
                        <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
                            <Typography>
                                {ingredient.amount}
                            </Typography>
                            <Typography>
                                {ingredient.unit}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            ))}
        </Box>
        <Typography variant="h6" sx={{ fontWeight: "600", color: "text.primary" }}>
            Instructions
        </Typography>
        <Box>
            {recipe.instructions.map((step, i) => (
                <Typography key={i} variant="body1">
                    {`${i + 1}. ${step}`}
                </Typography>
            ))}
        </Box>
    </Box>
    );
}