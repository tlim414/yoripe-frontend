import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
// MUI
import { Box, Grid, Typography, CircularProgress } from '@mui/material';

// Components
import RecipeCard from './RecipeCard';
import RecipeDetailsManager from './RecipeDetailsManager';
// Constants
import { QUERY_PARAMS, SEARCH_TYPE } from '../../constants/routes';
//Hooks
import { useRecipeList } from '../../hooks/recipes';
// Services
import { devLog } from '../../services/devlog';
// Types
import { type RecipeSummary, type SearchType } from '../../types/types';

export default function RecipeList() {
  const [selectedRecipeId, setSelectedRecipeId] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get(QUERY_PARAMS.Q) || '';
  const searchBy = (searchParams.get(QUERY_PARAMS.BY) as SearchType) || SEARCH_TYPE.ALL;

  // // Get recipe list from cache
  const { data: recipeList = [], isLoading, isError } = useRecipeList(searchQuery, searchBy);

  // Handle functions
  function handleRecipeSelect(recipeId: string) {
    devLog('clicked recipe');
    setSelectedRecipeId(recipeId);
  }

  function handleDialogClose() {
    setSelectedRecipeId(null);
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
          width: '100%',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // Render error message if something went wrong fetching recipes
  if (isError) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '40vh',
          width: '100%',
        }}
      >
        <Typography color="text.secondary">No recipes found.</Typography>
      </Box>
    );
  }

  // Render that there are no recipes
  if (recipeList.length === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '40vh',
          width: '100%',
        }}
      >
        <Typography color="text.secondary">No recipes found.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 6, width: '100%' }}>
      <Grid container spacing={3}>
        {recipeList.map((recipe: RecipeSummary) => (
          <Grid key={recipe.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <RecipeCard recipe={recipe} onClick={() => handleRecipeSelect(recipe.id)} />
          </Grid>
        ))}
      </Grid>
      {Boolean(selectedRecipeId) && (
        <RecipeDetailsManager onClose={handleDialogClose} recipeId={selectedRecipeId} />
      )}
    </Box>
  );
}
