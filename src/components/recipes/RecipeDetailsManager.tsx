import { useState } from "react";
// MUI
import { Box, Button, CircularProgress, DialogActions, DialogContent, DialogTitle, IconButton, Menu, MenuItem, Typography } from "@mui/material"
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
// Clerk

// Components
import RecipeDetails from "./RecipeDetails";
import RecipeForm, { FORM_MODE } from "./RecipeForm";
// Types
// Services
import { devLog } from "../../services/devlog";
// Hooks
import { useDeleteRecipe, useRecipe } from "../../hooks/recipes";
import { AppDialog } from "../ui/AppDialog";


type RecipeDetailsManagerProp = {
    onClose: () => void,
    recipeId: string | null,
}

export default function RecipeDetailsManager({ onClose, recipeId }: RecipeDetailsManagerProp) {
    // Recipe Hooks
    const { data: recipe, isLoading, isError } = useRecipe(recipeId);
    const deleteMutation = useDeleteRecipe();

    const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
    const isMenuOpen = Boolean(menuAnchorEl);

    const [isEditing, setIsEditing] = useState<boolean>(false);

    if (!recipeId) {
        console.error("Cannot retrieve recipe info: Missing ID");
        return null;
    }


    // Helpers for menu
    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMenuAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setMenuAnchorEl(null);
    };

    const handleDeleteClick = async (id: string) => {
        // Close menu
        handleMenuClose();

        if (isEditing) {
            handleEditClose();
        }

        // Delete the recipe
        deleteMutation.mutate(id, {
            onSuccess: () => {
                onClose();
            }
        })
    };

    // Helpers for Editing flow
    const handleEditClick = () => {
        handleMenuClose();
        setIsEditing(true);
        devLog("recipe deleted");
    }

    const handleEditClose = () => {
        setIsEditing(false);
    }

    const handleEditSuccess = () => {
        devLog("recipe edited");
    }

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
        <AppDialog isOpen={Boolean(recipeId)} onClose={onClose}>
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
                        <MoreHorizOutlinedIcon color="action"/>
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
                            onClick={handleEditClick}
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
                            onClick={() => handleDeleteClick(recipe.id)}
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
            {/* If editing render the form to edit and preload the selected recipe to populate the
            input fields */}
            {isEditing ?
                <RecipeForm
                    formMode={FORM_MODE.EDIT}
                    onSuccess={handleEditSuccess}
                    onClose={handleEditClose}
                    initialData={recipe} /> :
                <>
                    <DialogContent>
                        <RecipeDetails
                            recipe={recipe} />
                    </DialogContent>
                    <DialogActions sx={{ p: 2, gap: 1, justifyContent:"center" }}>
                        {/* 1. Cancel Button */}
                        <Button
                            type="button"
                            onClick={onClose}
                            color="inherit"
                        >
                            Close
                        </Button>
                    </DialogActions>
                </>
            }
        </AppDialog>
    )
}