import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Header from './Components/Header';
import Form from './Components/Form';
import Footer from './Components/Footer';
// import { Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// TODO:
// 1. Add title on mobile
// 2. Add sub-title above the Form?

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
          {/* <Typography variant="h4" style={{ textAlign: 'center', marginTop: 20 }}>
  Find Your Car's Value
</Typography>
<Typography variant="subtitle1" style={{ textAlign: 'center', marginTop: 10 }}>
  Submit your details and a trusted dealer will contact you with a cash offer
</Typography> */}
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
