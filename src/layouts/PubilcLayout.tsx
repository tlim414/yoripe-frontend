import { Container } from "@mui/material";
import LandingPage from "../pages/LandingPage";

type PublicLayoutProps = {
    children?: React.JSX.Element,
}

export default function PublicLayout({
    children,
}: PublicLayoutProps) {
    return (
        <Container maxWidth="lg">
            {children}
        </Container>
    )
}