import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Header from './Components/Header';
import Form from './Components/Form';
import Footer from './Components/Footer';
// import reportWebVitals from './reportWebVitals';
import { motion } from 'framer-motion';

const rootElement = document.getElementById('root');
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delay: 0.5 } }
};

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <motion.div variants={containerVariants} initial="hidden" animate="visible" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <div style={{ flex: 1 }}>
          <Form />
        </div>
        <Footer />
      </motion.div>
    </React.StrictMode>
  );
} else {
  console.error("Root element not found");
}

// reportWebVitals();
