// MUI
import { Box, Divider, MenuItem, TextField, Typography, useColorScheme } from '@mui/material';

const THEME_OPTIONS = [
  { value: 'system', label: 'System' },
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
] as const;

type ThemeMode = (typeof THEME_OPTIONS)[number]['value'];

export default function SettingsPage() {
  const { mode, setMode } = useColorScheme();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'left',
        width: '100%',
        gap: 2,
      }}
    >
      <Typography variant="h5">Appearance</Typography>
      <Divider />
      {/* Theme Settings */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Typography variant="h6">Theme</Typography>
        <TextField
          select
          label=""
          variant="outlined"
          size="small"
          value={mode}
          onChange={(e) => setMode(e.target.value as ThemeMode)}
        >
          {THEME_OPTIONS.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>
    </Box>
  );
}
