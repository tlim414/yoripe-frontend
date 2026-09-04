// MUI
import { Box } from '@mui/material';

// Clerk
import { Show, SignInButton, SignUpButton } from '@clerk/react';
import { ROUTES } from '../../constants/routes';

export default function Login() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Show when="signed-out">
        <SignInButton mode="modal" forceRedirectUrl={ROUTES.MY} />
        <SignUpButton mode="modal" forceRedirectUrl={ROUTES.MY} />
      </Show>
    </Box>
  );
}
