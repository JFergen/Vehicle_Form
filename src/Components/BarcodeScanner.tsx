import React, { useState } from 'react';
import { useZxing } from 'react-zxing';
import { Dialog, DialogContent, IconButton, Box, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface BarcodeScannerProps {
  open: boolean;
  onClose: () => void;
  onScan: (result: string) => void;
}

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ open, onClose, onScan }) => {
  const [error, setError] = useState<string>('');
  
  const { ref } = useZxing({
    onDecodeResult(result) {
      onScan(result.getText());
      onClose();
    },
    onError(error) {
      console.error("Scanner Error:", error);
      setError("Failed to access camera. Please ensure camera permissions are granted.");
    },
    constraints: {
      video: {
        facingMode: "environment",
        width: { min: 640, ideal: 1280, max: 1920 },
        height: { min: 480, ideal: 720, max: 1080 }
      },
    },
  });

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      fullScreen
      PaperProps={{
        style: {
          background: 'black'
        }
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: 'white',
          zIndex: 1
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            position: 'relative'
          }}
        >
          {error ? (
            <Typography color="error" align="center">
              {error}
            </Typography>
          ) : (
            <>
              <video 
                ref={ref} 
                style={{ 
                  width: '100%', 
                  maxWidth: '100vw',
                  height: 'auto',
                  maxHeight: '100vh',
                  objectFit: 'contain'
                }} 
              />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 32,
                  left: 0,
                  right: 0,
                  textAlign: 'center'
                }}
              >
                <Typography color="white">
                  Position the barcode within the camera view
                </Typography>
              </Box>
            </>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default BarcodeScanner; 