import { Box, Dialog, DialogContent, DialogTitle, Grid, Typography } from "@mui/material"
import type { RecipeDetail } from "../../types";
import { devLog } from "../../services/devlog";
import CircleIcon from '@mui/icons-material/Circle';


type RecipeDetailsProp = {
    isOpen: boolean,
    onClose: () => void,
    recipe: RecipeDetail,
}

export default function RecipeDetails({ isOpen, onClose, recipe }: RecipeDetailsProp) {

    if (!recipe) {
        return;
    }


    devLog(recipe);
    return (
        <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle
                sx={{
                    fontWeight: "600",
                    color: "text.primary",
                }}
            >
                {recipe.title}
            </DialogTitle>
            <DialogContent>
                <Box
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
                                    <Box sx={{ display: "flex", flexDirection: "row", gap: 1}}>
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
                        {recipe.instructions.map((step, index) => (
                            <Typography variant="body1">
                                {`${index + 1}. ${step}`}
                            </Typography>
                        ))}
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    )
}