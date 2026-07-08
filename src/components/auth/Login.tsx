import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/react'
import { Box, Container } from '@mui/material';


export default function Login() {

    return (
            <Box sx={{ display: 'flex', alignItems: 'center', }}>
                <Show when="signed-out">
                    <SignInButton />
                    <SignUpButton />
                </Show>
                <Show when="signed-in">
                    <UserButton />
                </Show>
            </Box>
    );
};