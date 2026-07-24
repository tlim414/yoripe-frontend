// MUI
import { Box, Typography } from "@mui/material";


type NavBarProps = {
    children?: React.JSX.Element,
}

export default function NavBar({
    children,
}: NavBarProps) {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                py: 2,
                width: '100%',
            }}>
            {/* App Icon */}
            <Box
                component="img"
                src="/favicon.svg" // Path relative to your Vite 'public' folder
                alt="Yoripe Logo"
                sx={{
                    width: 36,
                    height: 36,
                    objectFit: 'contain',
                }}
            />
            {/* App Logo */}
            <Typography
                variant="h4"
                sx={{
                    color: "inherit",
                }}>Yoripe</Typography>

            {/* Render children */}
            {children}
        </Box>
    )
}