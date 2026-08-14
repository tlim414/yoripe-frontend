import { Box, Container } from '@mui/material';
import NavBar from '../components/ui/NavBar';
import Login from '../components/auth/Login';

type PublicLayoutProps = {
  children?: React.JSX.Element;
};

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <Container maxWidth="lg">
      <NavBar>
        <>
          {/* App Icon */}
          <Box
            component="img"
            src="/favicon.svg"
            alt="Yoripe Logo"
            sx={{
              width: 36,
              height: 36,
              objectFit: 'contain',
            }}
          />
          <Login />
        </>
      </NavBar>
      {children}
    </Container>
  );
}
