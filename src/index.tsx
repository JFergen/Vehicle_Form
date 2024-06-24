import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Header from './Components/Header';
import Form from './Components/Form';
import Footer from './Components/Footer';
import { motion } from 'framer-motion';
import { ThemeProvider, createTheme } from '@mui/material/styles';

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
      main: '#ff0000', // Red
    },
    secondary: {
      main: '#000000', // Black
    },
    background: {
      default: '#000000', // Black background
    }
  },
});

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
          <div style={{ display: 'flex', flex: 1 }}>
            <Form />
          </div>
          <Footer />
        </motion.div>
      </ThemeProvider>
    </React.StrictMode>
  );
} else {
  console.error("Root element not found");
}
