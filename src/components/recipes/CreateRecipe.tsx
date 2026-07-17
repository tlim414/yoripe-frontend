import { useState } from "react";
// MUI
import {
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    MenuItem,
    Select,
    TextField,
    Typography,
    type DialogProps
} from "@mui/material";
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import type { CreateRecipePayload } from "../../types";
import { createRecipe } from "../../services/recipeApi";
import { getToken } from "@clerk/react";

// Hooks
import { useCreateRecipe } from "../../hooks/recipes";
// Services
import { devLog } from "../../services/devlog";


type NewIngredient = {
    name: string,
    amount: string,
    unit: string,
}

type CreateRecipeProps = {
    isOpen: boolean,
    onClose: () => void,
    onCreated: () => void,
}

export default function CreateRecipe({ isOpen, onClose, onCreated }: CreateRecipeProps) {
    // Recipe Hooks
    const createMutation = useCreateRecipe();

    // Form Fields
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [instructions, setInstructions] = useState<string[]>([""]);
    const [ingredients, setIngredients] = useState<NewIngredient[]>([{
        name: "",
        amount: "",
        unit: "",
    }])

    // Form States
    const [currStep, setCurrStep] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form Steps
    const TOTAL_STEPS = 2;
    const IS_LAST_STEP = currStep === TOTAL_STEPS - 1;

    const handleCancelOrClose = () => {
        devLog("Resetting form");

        setTitle("");
        setDescription("");
        setInstructions([""]);
        setIngredients([{
            name: "",
            amount: "",
            unit: "",
        }]);
        setCurrStep(0);
        setIsSubmitting(false);
        onClose();
    };

    const handleDialogClose: DialogProps["onClose"] = (event, reason) => {
        if (reason && reason == "backdropClick") {
            devLog("Backdrop click ignored");
            return;
        }
        devLog("Closing form");
        handleCancelOrClose();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim() || (instructions.length === 1 && !instructions[0].trim())) return;

        setIsSubmitting(true);

        // If ingredient or instruction list has extra item that is empty trim it
        const hasEmptyLastStep = instructions[instructions.length - 1].trim() === "";
        const cleanedInstructions = hasEmptyLastStep ? instructions.slice(0, -1) : instructions;
        const lastIngredient = ingredients[ingredients.length -1];
        const hasEmptyIngredient = lastIngredient.name.trim() === "" && lastIngredient.amount === "" && lastIngredient.unit === "";
        const cleanedIngredients = hasEmptyIngredient ? ingredients.slice(0, -1) : ingredients;
        // Create payload to create recipe
        const payload: CreateRecipePayload = {
            title: title,
            description: description,
            instructions: cleanedInstructions,
            ingredients: cleanedIngredients.map((ingredient) => ({
                ...ingredient,
                amount: parseFloat(ingredient.amount) || 0,
            })),
        }

        createMutation.mutate(payload, {
            onSuccess: () => {
                onCreated();
                handleCancelOrClose();
            }
        });
        devLog("Created new recipe");
    }

    // Helpers for ingredient input
    const handleAddIngredient = () => {
        if (!ingredients[ingredients.length - 1].name.trim()) return;
        const newIngredient = {
            name: "",
            amount: "",
            unit: "",
        }
        setIngredients([...ingredients, newIngredient]);
    }

    const handleDeleteIngredient = (idx: number) => {
        if (ingredients.length === 1) {
            const newIngredient = {
                name: "",
                amount: "",
                unit: "",
            }
            setIngredients([newIngredient]);
            return;
        }

        const updatedIngredients = ingredients.filter((_, i) => i !== idx);
        setIngredients(updatedIngredients);
    }

    const handleIngredientChange = (idx: number, field: keyof NewIngredient, value: string) => {
        const updatedIngredients = [...ingredients];

        updatedIngredients[idx] = {
            ...updatedIngredients[idx],
            [field]: value
        }

        setIngredients(updatedIngredients);
    }

    // Helpers for instructions input
    const handleAddInstruction = () => {
        if (!instructions[instructions.length - 1].trim()) return;
        setInstructions([...instructions, ""]);
    }

    const handleDeleteInstruction = (idx: number) => {
        if (instructions.length === 1) {
            setInstructions([""]);
            return;
        }

        const updatedInstructions = instructions.filter((_, i) => i !== idx);
        setInstructions(updatedInstructions);
    }

    const handleInstructionChange = (idx: number, step: string) => {
        const updatedInstructions = [...instructions];
        updatedInstructions[idx] = step;
        setInstructions(updatedInstructions);
    }


    return (
        <Dialog open={isOpen} onClose={handleDialogClose} fullWidth maxWidth="sm">
            <DialogTitle>New Recipe</DialogTitle>
            <Box component="form" onSubmit={handleSubmit}>
                <DialogContent>
                    {/* STEP 1: Enter title and description */}
                    {currStep === 0 && (
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: '600', color: 'text.secondary' }}>
                                Recipe Name
                            </Typography>
                            <TextField
                                label=""
                                placeholder="eg. Cream Pasta"
                                variant="outlined"
                                size="small"
                                fullWidth
                                required
                                disabled={isSubmitting}
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <Typography variant="subtitle2" sx={{ fontWeight: '600', color: 'text.secondary' }}>
                                Description / Notes
                            </Typography>
                            <TextField
                                label="Any additional details..."
                                placeholder=""
                                variant="outlined"
                                size="small"
                                fullWidth
                                disabled={isSubmitting}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Box>
                    )}

                    {/* STEP 2: Enter instructions and ingredients */}
                    {currStep === 1 && (
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
                            {/* Ingredients Section */}
                            <Typography variant="subtitle2" sx={{ fontWeight: '600', color: 'text.secondary' }}>
                                Ingredients
                            </Typography>
                            {ingredients.map((ingredient, i) => (
                                <Box
                                    key={i}
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        gap: 1
                                    }}
                                >
                                    {/* Ingredient NAme */}
                                    <TextField
                                        label="Name"
                                        placeholder="eg. salt"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        required
                                        disabled={isSubmitting}
                                        value={ingredient.name}
                                        onChange={(e) => handleIngredientChange(i, "name", e.target.value)}
                                    />
                                    {/* Ingredient Amount */}
                                    <TextField
                                        label="Amount"
                                        placeholder=""
                                        variant="outlined"
                                        size="small"
                                        type="number"
                                        fullWidth
                                        required
                                        disabled={isSubmitting}
                                        value={ingredient.amount}
                                        onChange={(e) => handleIngredientChange(i, "amount", e.target.value)}
                                    />
                                    {/* Drop Down for Ingredient Unit */}
                                    <Select
                                        label="Unit"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        required
                                        disabled={isSubmitting}
                                        value={ingredient.unit}
                                        onChange={(e) => handleIngredientChange(i, "unit", e.target.value)}
                                    >
                                        <MenuItem value="kg">kg</MenuItem>
                                    </Select>
                                    <IconButton
                                        color="error"
                                        onClick={() => handleDeleteIngredient(i)}
                                    >
                                        <RemoveCircleOutlineOutlinedIcon />
                                    </IconButton>
                                </Box>
                            ))}
                            {/* Button to add ingredient */}
                            <Button
                                type="button"
                                variant="contained"
                                onClick={handleAddIngredient}
                            >
                                Add Ingredient
                            </Button>

                            {/* Instructions section */}
                            <Typography variant="subtitle2" sx={{ fontWeight: '600', color: 'text.secondary' }}>
                                Instructions
                            </Typography>
                            {instructions.map((step, i) => (
                                <Box
                                    key={i}
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "flex-start",
                                        gap: 1,
                                    }}
                                >
                                    {/* Step Num */}
                                    <Typography>
                                        {i + 1}
                                    </Typography>
                                    {/* Step Iput Field */}
                                    <TextField
                                        label=""
                                        placeholder="Explain this step..."
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        disabled={isSubmitting}
                                        value={step}
                                        onChange={(e) => handleInstructionChange(i, e.target.value)}
                                    />
                                    {/* Delete Step Icon */}
                                    <IconButton
                                        color="error"
                                        onClick={() => handleDeleteInstruction(i)}
                                    >
                                        <RemoveCircleOutlineOutlinedIcon />
                                    </IconButton>
                                </Box>
                            ))}
                            {/* Add step button */}
                            <Button
                                type="button"
                                variant="contained"
                                onClick={handleAddInstruction}
                            >
                                Add Step
                            </Button>
                        </Box>
                    )}
                </DialogContent>

                {/* Footer Buttons */}
                <DialogActions sx={{ p: 2, gap: 1 }}>
                    {/* 1. Cancel Button */}
                    <Button
                        type="button"
                        onClick={handleCancelOrClose}
                        disabled={isSubmitting}
                        color="inherit"
                    >
                        Cancel
                    </Button>

                    {/* 2. Prev Button */}
                    <Button
                        type="button"
                        variant="contained"
                        color="inherit"
                        disabled={currStep === 0 || isSubmitting}
                        onClick={() => {
                            if (currStep === 1) {
                                setCurrStep(0);
                            }
                        }}
                    >
                        Prev
                    </Button>

                    {/* 3. Next / Create Button */}
                    <Button
                        key={`next-btn-step-${currStep}`}
                        type={IS_LAST_STEP ? "submit" : "button"}
                        variant="contained"
                        disabled={
                            (currStep === 0 && !title.trim()) ||
                            (currStep === 1 && (instructions.length === 1 && !instructions[0].trim())) ||
                            isSubmitting
                        }
                        startIcon={(IS_LAST_STEP && isSubmitting) ?
                            <CircularProgress size={16} color="inherit" /> : null}
                        onClick={() => {
                            if (currStep === 0 && title.trim()) {
                                setCurrStep(1);
                            }
                        }}
                    >
                        {IS_LAST_STEP ? "Create" : "Next"}
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    )
}