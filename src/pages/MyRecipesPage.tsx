import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

// MUI
import {
  Box,
  Button,
  Container,
  DialogTitle,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  TextField,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from '@mui/icons-material/FilterList';

// Components
import RecipeForm from '../components/recipes/RecipeForm';
import RecipeList from '../components/recipes/RecipeList';
import { AppDialog } from '../components/ui/AppDialog';
// Contstants
import { QUERY_PARAMS, ROUTES, SEARCH_TYPE } from '../constants/routes';
import { FORM_MODE } from '../constants/recipes';
// Services
import { devLog } from '../services/devlog';
// Types
import type { SearchType } from '../types/types';

export default function MyRecipesPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchOption, setSearchOption] = useState<SearchType>(SEARCH_TYPE.ALL);
  const currSearch = searchParams.get(QUERY_PARAMS.Q) || '';

  const [searchMenuAnchorEl, setSearchMenuAnchorEl] = useState<null | HTMLElement>(null);
  const isSearchMenuOpen = Boolean(searchMenuAnchorEl);

  // Handle functions
  const handleCreateClick = () => {
    setIsCreateModalOpen(true);
  };

  const handleCreateClose = () => {
    setIsCreateModalOpen(false);
  };

  const handleCreateSuccess = () => {
    devLog('recipe created');
  };

  const handleSearchChange = (search: string) => {
    devLog('search bar content changed');
    if (search.trim()) {
      navigate(
        `${ROUTES.MY}?${QUERY_PARAMS.Q}=${encodeURIComponent(search)}&${QUERY_PARAMS.BY}=${searchOption}`,
        { replace: true }
      );
    } else {
      navigate(`${ROUTES.MY}`, { replace: true });
    }
  };

  const handleSearchMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setSearchMenuAnchorEl(event.currentTarget);
  };

  const handleSearchMenuClose = () => {
    setSearchMenuAnchorEl(null);
  };

  const handleSearchBySelect = (option: SearchType) => {
    devLog(`search ${option}`);
    handleSearchMenuClose();
    setSearchOption(option);

    const newParams = new URLSearchParams(searchParams);

    const trimmedCurrSearch = currSearch.trim();
    if (trimmedCurrSearch) {
      newParams.set(QUERY_PARAMS.Q, trimmedCurrSearch);
      newParams.set(QUERY_PARAMS.BY, option);
    } else {
      newParams.delete(QUERY_PARAMS.Q);
      newParams.delete(QUERY_PARAMS.BY);
    }
    setSearchParams(newParams);
  };

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 3,
          }}
        >
          {/* Search bar */}
          <TextField
            variant="outlined"
            placeholder="Search..."
            color="primary"
            label={`${searchOption === SEARCH_TYPE.ALL ? 'All Fields' : searchOption}`}
            size="small"
            onChange={(e) => handleSearchChange(e.target.value)}
            value={currSearch}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  // Filter Icon
                  <IconButton color="inherit" onClick={handleSearchMenuOpen}>
                    <FilterListIcon />
                  </IconButton>
                ),
              },
            }}
            sx={{
              width: '100%',
              '& .MuiOutlinedInput-root': {
                borderRadius: '50px',
                backgroundColor: 'background.search',
                '&:hover': {
                  backgroundColor: 'background.searchHover',
                },
              },
            }}
          />
          {/* Filter dropdown */}
          <Menu
            anchorEl={searchMenuAnchorEl}
            open={isSearchMenuOpen}
            onClose={handleSearchMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            {/* Search by all */}
            <MenuItem
              onClick={() => handleSearchBySelect(SEARCH_TYPE.ALL)}
              sx={{
                color: 'text.primary',
                gap: 1,
                fontWeight: '500',
              }}
            >
              All
            </MenuItem>

            {/* Search by title */}
            <MenuItem
              onClick={() => handleSearchBySelect(SEARCH_TYPE.TITLE)}
              sx={{
                color: 'text.primary',
                gap: 1,
                fontWeight: '500',
              }}
            >
              Title
            </MenuItem>
            {/* Search by ingredient */}
            <MenuItem
              onClick={() => handleSearchBySelect(SEARCH_TYPE.INGREDIENT)}
              sx={{
                color: 'text.primary',
                gap: 1,
                fontWeight: '500',
              }}
            >
              Ingredient
            </MenuItem>
          </Menu>
          {/* Create new recipe button */}
          <Button variant="contained" startIcon={<AddIcon />} onClick={handleCreateClick}>
            New
          </Button>
        </Box>
        <RecipeList />
      </Box>

      {/* Modal for creating a recipe */}
      {isCreateModalOpen && (
        <AppDialog isOpen={isCreateModalOpen} onClose={handleCreateClose}>
          <DialogTitle sx={{ fontWeight: '600', color: 'text.primary' }}>New Recipe</DialogTitle>
          <RecipeForm
            formMode={FORM_MODE.CREATE}
            onSuccess={handleCreateSuccess}
            onClose={handleCreateClose}
          />
        </AppDialog>
      )}
    </Container>
  );
}
