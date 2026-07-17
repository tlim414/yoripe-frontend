// MUI
import { Box } from "@mui/material";


// Components
import Login from "./auth/Login";


export default function NavBar() {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                py: 2,
                width: '100%',
            }}>
            <Login />
        </Box>
    )
}