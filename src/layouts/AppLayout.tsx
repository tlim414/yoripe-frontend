// Clerk
import { UserButton } from "@clerk/react";
// MUI
import { Container } from "@mui/material";

// Components
import NavBar from "../components/ui/NavBar";

type AppLayoutProps = {
    children?: React.JSX.Element,
}

export default function AppLayout({
    children,
}: AppLayoutProps) {

    return (
        <Container maxWidth="lg">
            <NavBar >
                <UserButton />
            </NavBar>
            {children}
        </Container>
    )
}