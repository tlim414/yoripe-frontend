import { Container } from "@mui/material";
import LandingPage from "../pages/LandingPage";
import NavBar from "../components/ui/NavBar";
import Login from "../components/auth/Login";

type PublicLayoutProps = {
    children?: React.JSX.Element,
}

export default function PublicLayout({
    children,
}: PublicLayoutProps) {
    return (
        <Container maxWidth="lg">
            <NavBar>
                <Login />
            </NavBar>
            {children}
        </Container>
    )
}