import { useState } from 'react';
// MUI
import {
  Box,
  Button,
  CircularProgress,
  DialogActions,
  DialogContent,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';

// Hooks
import { useCreateRecipe, useUpdateRecipe } from '../../hooks/recipes';
// Services
import { devLog } from '../../services/devlog';
import { FORM_MODE, UNITS } from '../../constants/recipes';
// Types
import type { RecipePayload, Recipe, FormMode } from '../../types/types';

type NewIngredient = {
  name: string;
  amount: string;
  unit: string;
};

type CreateRecipeProps = {
  formMode: FormMode;
  onClose: () => void;
  onSuccess: () => void;
  initialData?: Recipe;
};

export default function RecipeForm({
  formMode,
  onClose,
  onSuccess,
  initialData,
}: CreateRecipeProps) {
  // Recipe Hooks
  const createMutation = useCreateRecipe();
  const updateMutation = useUpdateRecipe();

  // Form Fields
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [instructions, setInstructions] = useState<string[]>(initialData?.instructions || ['']);
  const [ingredients, setIngredients] = useState<NewIngredient[]>(
    initialData?.ingredients || [
      {
        name: '',
        amount: '',
        unit: '',
      },
    ]
  );

  // Form States
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetFields = () => {
    devLog('Resetting form');

    setTitle('');
    setDescription('');
    setInstructions(['']);
    setIngredients([
      {
        name: '',
        amount: '',
        unit: '',
      },
    ]);
    setIsSubmitting(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || (instructions.length === 1 && !instructions[0].trim())) return;

    setIsSubmitting(true);

    // If ingredient or instruction list has extra item that is empty trim it
    const hasEmptyLastStep = instructions[instructions.length - 1].trim() === '';
    const cleanedInstructions = hasEmptyLastStep ? instructions.slice(0, -1) : instructions;
    const lastIngredient = ingredients[ingredients.length - 1];
    const hasEmptyIngredient =
      lastIngredient.name.trim() === '' &&
      lastIngredient.amount === '' &&
      lastIngredient.unit === '';
    const cleanedIngredients = hasEmptyIngredient ? ingredients.slice(0, -1) : ingredients;
    // Create payload to create recipe
    const payload: RecipePayload = {
      title: title,
      description: description,
      instructions: cleanedInstructions,
      ingredients: cleanedIngredients.map((ingredient) => ({
        ...ingredient,
        amount: parseFloat(ingredient.amount) || 0,
      })),
    };

    if (formMode == FORM_MODE.CREATE) {
      createMutation.mutate(payload, {
        onSuccess: () => {
          onSuccess();
          resetFields();
          onClose();
        },
      });
    }
    if (formMode == FORM_MODE.EDIT) {
      if (!initialData?.id) {
        console.error('Cannot update recipe: Missing ID');
        return;
      }
      devLog(payload);
      updateMutation.mutate(
        {
          recipeId: initialData.id,
          updatedRecipe: payload,
        },
        {
          onSuccess: () => {
            onSuccess();
            resetFields();
            onClose();
          },
        }
      );
    }
  };

  // Helpers for ingredient input
  const handleAddIngredient = () => {
    if (!ingredients[ingredients.length - 1].name.trim()) return;
    const newIngredient = {
      name: '',
      amount: '',
      unit: '',
    };
    setIngredients([...ingredients, newIngredient]);
  };

  const handleDeleteIngredient = (idx: number) => {
    if (ingredients.length === 1) {
      const newIngredient = {
        name: '',
        amount: '',
        unit: '',
      };
      setIngredients([newIngredient]);
      return;
    }

    const updatedIngredients = ingredients.filter((_, i) => i !== idx);
    setIngredients(updatedIngredients);
  };

  const handleIngredientChange = (idx: number, field: keyof NewIngredient, value: string) => {
    const updatedIngredients = [...ingredients];

    updatedIngredients[idx] = {
      ...updatedIngredients[idx],
      [field]: value,
    };

    setIngredients(updatedIngredients);
  };

  // Helpers for instructions input
  const handleAddInstruction = () => {
    if (!instructions[instructions.length - 1].trim()) return;
    setInstructions([...instructions, '']);
  };

  const handleDeleteInstruction = (idx: number) => {
    if (instructions.length === 1) {
      setInstructions(['']);
      return;
    }

    const updatedInstructions = instructions.filter((_, i) => i !== idx);
    setInstructions(updatedInstructions);
  };

  const handleInstructionChange = (idx: number, step: string) => {
    const updatedInstructions = [...instructions];
    updatedInstructions[idx] = step;
    setInstructions(updatedInstructions);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      {/* Dialog Content */}
      <DialogContent>
        {/* Title Section */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: '600', color: 'text.primary' }}>
            Recipe Name
          </Typography>
          <TextField
            label=""
            placeholder="eg. Cream Pasta"
            variant="outlined"
            color="secondary"
            size="small"
            fullWidth
            required
            disabled={isSubmitting}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* Description Section */}
          <Typography variant="subtitle2" sx={{ fontWeight: '600', color: 'text.primary' }}>
            Description / Notes
          </Typography>
          <TextField
            label="Any additional details..."
            placeholder=""
            variant="outlined"
            color="secondary"
            size="small"
            fullWidth
            disabled={isSubmitting}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          {/* Ingredients Section */}
          <Typography variant="subtitle2" sx={{ fontWeight: '600', color: 'text.secondary' }}>
            Ingredients
          </Typography>
          {ingredients.map((ingredient, i) => (
            <Box
              key={i}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: 1,
              }}
            >
              {/* Ingredient Name */}
              <TextField
                label="Name"
                placeholder="eg. salt"
                variant="outlined"
                color="secondary"
                size="small"
                fullWidth
                required
                disabled={isSubmitting}
                value={ingredient.name}
                onChange={(e) => handleIngredientChange(i, 'name', e.target.value)}
              />
              {/* Ingredient Amount */}
              <TextField
                label="Amount"
                placeholder=""
                variant="outlined"
                color="secondary"
                size="small"
                type="number"
                fullWidth
                required
                disabled={isSubmitting}
                value={ingredient.amount}
                onChange={(e) => handleIngredientChange(i, 'amount', e.target.value)}
              />
              {/* Drop Down for Ingredient Unit */}
              <TextField
                select
                label="Unit"
                variant="outlined"
                color="secondary"
                size="small"
                fullWidth
                // required
                disabled={isSubmitting}
                value={ingredient.unit}
                onChange={(e) => handleIngredientChange(i, 'unit', e.target.value)}
              >
                {Object.values(UNITS).map((unit) => (
                  <MenuItem value={unit}>{unit || 'None'}</MenuItem>
                ))}
              </TextField>
              {/* Delete ingredient button */}
              <IconButton color="error" onClick={() => handleDeleteIngredient(i)}>
                <RemoveCircleOutlineOutlinedIcon />
              </IconButton>
            </Box>
          ))}
          {/* Button to add ingredient */}
          <Button type="button" variant="contained" color="secondary" onClick={handleAddIngredient}>
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
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 1,
              }}
            >
              {/* Step Num */}
              <Typography>{i + 1}</Typography>
              {/* Step Iput Field */}
              <TextField
                label=""
                placeholder="Explain this step..."
                variant="outlined"
                color="secondary"
                size="small"
                fullWidth
                disabled={isSubmitting}
                value={step}
                onChange={(e) => handleInstructionChange(i, e.target.value)}
              />
              {/* Delete Step Icon */}
              <IconButton color="error" onClick={() => handleDeleteInstruction(i)}>
                <RemoveCircleOutlineOutlinedIcon />
              </IconButton>
            </Box>
          ))}
          {/* Add step button */}
          <Button
            type="button"
            variant="contained"
            color="secondary"
            onClick={handleAddInstruction}
          >
            Add Step
          </Button>
        </Box>
      </DialogContent>

      {/* Dialog Actions - Footer Buttons */}
      <DialogActions sx={{ p: 2, gap: 1 }}>
        {/* 1. Cancel Button */}
        <Button type="button" onClick={onClose} disabled={isSubmitting} color="inherit">
          Cancel
        </Button>

        {/* 3. Next / Create / Save Edit Button */}
        <Button
          type={'submit'}
          variant="contained"
          disabled={
            !title.trim() || (instructions.length === 1 && !instructions[0].trim()) || isSubmitting
          }
          startIcon={isSubmitting ? <CircularProgress size={16} color="inherit" /> : null}
          onClick={handleSubmit}
        >
          Save
        </Button>
      </DialogActions>
    </Box>
  );
}
