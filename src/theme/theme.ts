import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface TypeBackground {
    search?: string;
    searchHover?: string;
  }
}
export const theme = createTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#FF7043',
        },
        secondary: {
          main: '#2E7D32',
        },
        background: {
          default: '#F5F2EC',
          paper: '#FFFDF9',
          search: '#f5f5f5',
          searchHover: '#ebebeb',
        },
        text: {
          primary: '#0f172a',
          secondary: '#475569',
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: '#E57C63',
        },
        secondary: {
          main: '#66A96B',
        },
        background: {
          default: '#0B0F17',
          paper: '#1A2332',
          search: '#1A2638',
          searchHover: '#2C3E5A',
        },
        text: {
          primary: '#F8FAFC',
          secondary: '#94A3B8',
        },
      },
    },
  },
  shape: {
    borderRadius: 12,
  },
});
