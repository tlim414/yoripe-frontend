// MUI
import { Box, Typography } from "@mui/material";

import logo from "../assets/logo.png";

export default function LandingPage() {
    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
        }}>
            <Box
            component={"img"}
            src={logo}
            sx={{
                height: 256,
                width: "auto",
            }}
            ></Box>
            <Typography
                variant="h2"
                sx={{
                    color: "primary",
                    fontFamily: "Arial"
                }}>
                Your Personal Recipe Vault, Simplified.
            </Typography>
            <Typography>
                Create, organize, and access all your favourite recipes in one distraction-free place.
            </Typography>
        </Box>
    )
}