import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, TextField, type DialogProps } from "@mui/material";
import { useState } from "react";
import { devLog } from "../../services/devlog";

type CreateRecipeProps = {
    isOpen: boolean,
    onClose: () => void,
    onCreated: () => void,
}

export default function CreateRecipe({ isOpen, onClose, onCreated }: CreateRecipeProps) {
    // Form Fields
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [instructions, setInstructions] = useState("");

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
        setInstructions("");
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

        if (!title.trim() || !instructions.trim()) return;

        try {
            setIsSubmitting(true);

            // Your API logic lives here
            // await axios.post('/api/recipes', { title, description, instructions });

            onCreated();
            handleCancelOrClose();

            devLog("Created new recipe");
        } catch (error) {
            console.error("Failed to create recipe:", error);
            setIsSubmitting(false); // Keeps data intact if request fails
        }
    }

    return (
        <Dialog open={isOpen} onClose={handleDialogClose} fullWidth maxWidth="sm">
            <DialogTitle>New Recipe</DialogTitle>
            <Box component="form" onSubmit={handleSubmit}>
                <DialogContent>
                    {/* STEP 1: Enter title and description */}
                    {currStep === 0 && (
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
                            <TextField
                                label="Recipe Title"
                                variant="outlined"
                                size="small"
                                fullWidth
                                required
                                disabled={isSubmitting}
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <TextField
                                label="Description"
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
                            <TextField
                                label="Instructions"
                                variant="outlined"
                                multiline
                                rows={4}
                                fullWidth
                                required
                                disabled={isSubmitting}
                                value={instructions}
                                onChange={(e) => setInstructions(e.target.value)}
                            />

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
                            (currStep === 1 && !instructions.trim()) ||
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