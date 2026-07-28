// MUI
import { Box, Typography, useColorScheme } from "@mui/material";

import logo_black from "../assets/logo_black.png";
import logo_white from "../assets/logo_white.png";

export default function LandingPage() {
    const { mode } = useColorScheme();

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
        }}>
            <Box
                component={"img"}
                src={mode === "dark" ? logo_white : logo_black}
                sx={{
                    height: 256,
                    width: "auto",
                }}
            />
            <Typography
                variant="h2"
                color="text.primary"
            >
                Your Personal Recipe Vault, Simplified.
            </Typography>
            <Typography
                variant="h5"
                color="text.secondary"
            >
                Create, organize, and access all your favourite recipes in one distraction-free place.
            </Typography>
        </Box>
    )
}