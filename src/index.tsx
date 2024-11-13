import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Header from './Components/Header';
import Form from './Containers/Form';
import Footer from './Components/Footer';
import { motion } from 'framer-motion';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

// Set the document title based on the environment variable
const environment = process.env.REACT_APP_ENVIRONMENT || 'Development';

if (environment !== 'PROD') {
  document.title = `Cash Offer Form - ${environment}`;
} else {
  document.title = 'Cash Offer Form';
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#424242', // Dark gray
      light: '#6d6d6d',
      dark: '#1b1b1b',
    },
    secondary: {
      main: '#757575', // Medium gray
      light: '#a4a4a4',
      dark: '#494949',
    },
    background: {
      default: '#fafafa', // Almost white
      paper: '#ffffff',
    },
    text: {
      primary: '#212121',
      secondary: '#757575',
    }
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      color: '#424242',
      fontWeight: 500,
    },
    body1: {
      color: '#424242',
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
          '&:hover': {
            boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
          },
        },
      },
    },
  },
});

// Add this code block for Eruda
if (process.env.NODE_ENV === 'development') {
  const eruda = require('eruda');
  eruda.init({
    tool: ['console', 'elements', 'network', 'resources', 'info'],
    useShadowDom: true,
    autoScale: true,
    defaults: {
      displaySize: 50,
      transparency: 0.9,
      theme: 'Material Dark'
    }
  });
}

const rootElement = document.getElementById('root');
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delay: 0.5 } }
};

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <motion.div variants={containerVariants} initial="hidden" animate="visible" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Header />
          <Box sx={{ 
            display: 'flex', 
            flex: 1,
            marginTop: {
              xs: 0,  // No margin on mobile
              sm: '20px'  // 20px margin on screens >= 600px (sm breakpoint)
            }
          }}>
            <Form />
          </Box>
          <Footer />
        </motion.div>
      </ThemeProvider>
    </React.StrictMode>
  );
} else {
  console.error("Root element not found");
}
