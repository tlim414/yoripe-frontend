import { useState } from "react";

// Clerk
import { UserButton } from "@clerk/react";
// MUI
import { Box, Container, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ExploreIcon from '@mui/icons-material/Explore';
import SettingsIcon from '@mui/icons-material/Settings';

// Components
import NavBar from "../components/ui/NavBar";
import { ROUTES } from "../constants/routes";
import { Link } from "react-router-dom";

type AppLayoutProps = {
    children?: React.JSX.Element,
}

export default function AppLayout({
    children,
}: AppLayoutProps) {
    const [isMenuSideBarOpen, setIsMenuSideBarOpen] = useState(false);


    const menuSideBarPages = [
        { label: "My Recipe", path: ROUTES.MY, icon: <MenuBookIcon /> },
        { label: "Explore", path: ROUTES.EXPLORE, icon: <ExploreIcon /> },
    ]
    const menuSideBarSubItems = [
        { label: "Settings", path: ROUTES.SETTINGS, icon: <SettingsIcon /> },
    ]

    const handleMenuSideBarClick = () => {
        setIsMenuSideBarOpen(true);
    }

    const handleMenuSideBarClose = () => {
        setIsMenuSideBarOpen(false);
    }
    return (
        <Container maxWidth="lg">
            <NavBar >
                <>
                    <IconButton
                        onClick={handleMenuSideBarClick}>
                        <MenuIcon color="secondary" />
                    </IconButton>
                    <UserButton />
                </>
            </NavBar>
            {children}
            <Drawer open={isMenuSideBarOpen} onClose={handleMenuSideBarClose}>
                <Box
                    sx={{
                        width: 250,
                    }}
                    role="presentation"
                    onClick={handleMenuSideBarClose}>
                    <List>
                        {menuSideBarPages.map((item) => (
                            <ListItem key={item.path}>
                                <ListItemButton
                                    component={Link}
                                    to={item.path}
                                    selected={location.pathname === item.path}
                                >
                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.label} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                        <Divider />
                        {menuSideBarSubItems.map((item) => (
                            <ListItem key={item.path}>
                                <ListItemButton
                                    component={Link}
                                    to={item.path}
                                    selected={location.pathname === item.path}
                                >
                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.label} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </Container>
    )
}