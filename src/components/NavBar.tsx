import { Box, Button, Container, InputAdornment, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search'
import AddIcon from '@mui/icons-material/Add'
import Login from "./auth/Login";
import { useNavigate, useSearchParams } from "react-router-dom";

type NavBarProps = {
    onNewClick: () => void,
}

export default function NavBar({ onNewClick }: NavBarProps) {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const currSearch = searchParams.get("search") || "";

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value) {
            navigate(`/?search=${encodeURIComponent(value)}`, { replace: true });
        } else {
            navigate(`/`, { replace: true });
        }
    }

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                py: 2,
                width: '100%',
            }}>
            <Button variant='contained' startIcon={<AddIcon />} onClick={onNewClick}>
                New
            </Button>
            <TextField
                variant="outlined"
                placeholder="Search..."
                size="small"
                onChange={handleSearchChange}
                value={currSearch}
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon color="action" />
                            </InputAdornment>
                        ),
                    }
                }}
                sx={{
                    width: '500px',
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '50px',
                        backgroundColor: '#f5f5f5',
                        '&:hover': {
                            backgroundColor: '#ebebeb',
                        },
                    },
                }}
            />
            <Login />
        </Box>
    )
}