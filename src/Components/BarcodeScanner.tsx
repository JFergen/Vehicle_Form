import React, { useState, useEffect } from 'react';
import { IconButton, useMediaQuery, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { BarcodeScanner } from 'react-barcode-scanner';

interface BarcodeScannerProps {
  open: boolean;
  onClose: () => void;
  onScan: (result: string) => void;
}

const BarcodeScannerComponent: React.FC<BarcodeScannerProps> = ({ open, onClose, onScan }) => {
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>(
    window.innerHeight > window.innerWidth ? 'portrait' : 'landscape'
  );
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const handleOrientationChange = () => {
      setOrientation(window.innerHeight > window.innerWidth ? 'portrait' : 'landscape');
    };

    window.addEventListener('resize', handleOrientationChange);
    window.addEventListener('orientationchange', handleOrientationChange);

    return () => {
      window.removeEventListener('resize', handleOrientationChange);
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, []);

  if (!open) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'black',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <IconButton
        onClick={onClose}
        style={{
          position: 'absolute',
          top: orientation === 'portrait' ? 16 : 8,
          right: orientation === 'portrait' ? 16 : 8,
          color: 'white',
          zIndex: 10000
        }}
      >
        <CloseIcon />
      </IconButton>
      
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: orientation === 'portrait' ? '80%' : '50%',
          maxWidth: orientation === 'portrait' ? '300px' : '500px',
          height: orientation === 'portrait' ? '100px' : '80px',
          border: '2px solid white',
          borderRadius: '8px',
          zIndex: 10000,
          boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.5)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <div
          style={{
            width: '90%',
            height: '2px',
            backgroundColor: 'red',
            position: 'absolute'
          }}
        />
      </div>
      
      <BarcodeScanner
        options={{ formats: ['code_39'] }}
        onCapture={(result) => {
          onScan(result[0].rawValue);
          onClose();
        }}
        style={{
          width: '100%',
          height: '100%',
          objectFit: orientation === 'portrait' ? 'cover' : 'contain'
        }}
      />
    </div>
  );
};

export default BarcodeScannerComponent;