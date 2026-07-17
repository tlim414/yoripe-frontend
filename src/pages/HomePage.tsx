import { useState } from "react";

// MUI
import { Box, Button, Container, IconButton, InputAdornment, Menu, MenuItem, Select, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search'
import AddIcon from '@mui/icons-material/Add'
import FilterListIcon from '@mui/icons-material/FilterList';

// Components
import CreateRecipe from "../components/recipes/CreateRecipe";
import { useNavigate, useSearchParams } from "react-router-dom";
import RecipeList from "../components/recipes/RecipeList";
// Contstants
import { SEARCH_TYPE } from "../constants/routes";
// Services
import { devLog } from "../services/devlog";
// Types
import type { SearchType } from "../types";




export default function HomePage() {
    const [isNewRecipeModalOpen, setIsNewRecipeModalOpen] = useState(false);

    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchOption, setSearchOption] = useState<SearchType>(SEARCH_TYPE.ALL);
    const currSearch = searchParams.get("q") || "";

    const [searchMenuAnchorEl, setSearchMenuAnchorEl] = useState<null | HTMLElement>(null);
    const isSearchMenuOpen = Boolean(searchMenuAnchorEl);

    // Handle functions
    const handleNewRecipeClick = () => {
        setIsNewRecipeModalOpen(true);
    }

    const handleSearchChange = (search: string) => {
        devLog("search bar content changed");
        if (search.trim()) {
            navigate(`/?q=${encodeURIComponent(search)}&by=${searchOption}`, { replace: true });
        } else {
            navigate(`/`, { replace: true });
        }
    }

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
            newParams.set("q", trimmedCurrSearch);
            newParams.set("by", option);
        } else {
            newParams.delete("q");
            newParams.delete("by");
        }
        setSearchParams(newParams);
    }

    return (
        <Container maxWidth='lg' >
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
            }}>
                <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 3,
                }}>
                    {/* Search bar */}
                    <TextField
                        variant="outlined"
                        placeholder="Search..."
                        label= {`${searchOption === SEARCH_TYPE.ALL ? "All Fields" : searchOption}`}
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
                                    <IconButton
                                        color="inherit"
                                        onClick={handleSearchMenuOpen}
                                    >
                                        <FilterListIcon />
                                    </IconButton>
                                )
                            }
                        }}
                        sx={{
                            width: '100%',
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '50px',
                                backgroundColor: '#f5f5f5',
                                '&:hover': {
                                    backgroundColor: '#ebebeb',
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
                            vertical: "bottom",
                            horizontal: "center",
                        }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "center",
                        }}
                    >
                        {/* Search by all */}
                        <MenuItem
                            onClick={() => handleSearchBySelect(SEARCH_TYPE.ALL)}
                            sx={{
                                color: 'text.primary',
                                gap: 1,
                                fontWeight: '500'
                            }}
                        >
                            All
                        </MenuItem>

                        {/* Search by title */}
                        <MenuItem
                            onClick={() => handleSearchBySelect(SEARCH_TYPE.TITLE)}
                            sx={{
                                color: 'test.primary',
                                gap: 1,
                                fontWeight: '500'
                            }}
                        >
                            Title
                        </MenuItem>
                        {/* Search by ingredient */}
                        <MenuItem
                            onClick={() => handleSearchBySelect(SEARCH_TYPE.INGREDIENT)}
                            sx={{
                                color: 'test.primary',
                                gap: 1,
                                fontWeight: '500'
                            }}
                        >
                            Ingredient
                        </MenuItem>
                    </Menu>
                    {/* Create new recipe button */}
                    <Button variant='contained' startIcon={<AddIcon />} onClick={handleNewRecipeClick}>
                        New
                    </Button>
                </Box>
                <RecipeList />
            </Box>
            <CreateRecipe isOpen={isNewRecipeModalOpen}
                onClose={() => setIsNewRecipeModalOpen(false)}
                onCreated={() => { }} />
        </Container>
    );
}
