import { useState } from "react";

// MUI
import { Box, CircularProgress, Dialog, DialogContent, DialogTitle, Grid, IconButton, Menu, MenuItem, Typography } from "@mui/material"
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

// Clerk
import { useAuth } from "@clerk/react";

// Types
import type { Recipe } from "../../types/types";

// Services
import { deleteRecipe } from "../../services/recipeApi";
import { devLog } from "../../services/devlog";

// Hooks
import { useDeleteRecipe, useRecipe } from "../../hooks/recipes";


type RecipeDetailsProp = {
    isOpen: boolean,
    onClose: () => void,
    recipeId: string | null,
}

export default function RecipeDetails({ isOpen, onClose, recipeId }: RecipeDetailsProp) {
    // Recipe Hooks
    const { data: recipe, isLoading, isError } = useRecipe(recipeId);
    const deleteMutation = useDeleteRecipe();

    const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
    const isMenuOpen = Boolean(menuAnchorEl);

    if (!recipeId) {
        return null;
    }


    // Helpers for menu
    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMenuAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setMenuAnchorEl(null);
    };

    const handleDeleteRecipe = async (id: string) => {
        handleMenuClose();

        deleteMutation.mutate(id, {
            onSuccess: () => {
                onClose();
            }
        })
    };

    // Render progress circle if loading
    if (isLoading) {
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

    // Render error message if something went wrong
    if (isError || !recipe) {
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
                <Typography color="text.secondary">No recipes found.</Typography>
            </Box>
        );
    }



    return (
        <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm">
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    pr: 2,
                }}>
                <DialogTitle
                    sx={{
                        fontWeight: "600",
                        color: "text.primary",
                    }}
                >
                    {recipe.title}
                </DialogTitle>

                {/* Menu */}
                <Box>
                    {/* More Menu Icon */}
                    <IconButton
                        onClick={handleMenuOpen}
                    >
                        <MoreHorizOutlinedIcon />
                    </IconButton>


                    <Menu
                        anchorEl={menuAnchorEl}
                        open={isMenuOpen}
                        onClose={handleMenuClose}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                        }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                    >
                        {/* Edit */}
                        <MenuItem
                            onClick={() => devLog("edit")}
                            sx={{
                                color: 'text.primary',
                                gap: 1,
                                fontWeight: '500'
                            }}
                        >
                            <EditOutlinedIcon fontSize="small" />
                            Edit
                        </MenuItem>

                        {/* Delete */}
                        <MenuItem
                            onClick={() => handleDeleteRecipe(recipe.id)}
                            sx={{
                                color: 'error.main',
                                gap: 1,
                                fontWeight: '500'
                            }}
                        >
                            <DeleteOutlineOutlinedIcon fontSize="small" />
                            Delete
                        </MenuItem>
                    </Menu>
                </Box>
            </Box>
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
            </DialogContent>
        </Dialog >
    )
}