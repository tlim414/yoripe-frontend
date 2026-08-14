// MUI
import { Box } from '@mui/material';

type NavBarProps = {
  children?: React.JSX.Element;
};

export default function NavBar({ children }: NavBarProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        py: 2,
        width: '100%',
      }}
    >
      {/* Render children */}
      {children}
    </Box>
  );
}
