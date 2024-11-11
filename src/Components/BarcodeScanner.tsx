import React, { useState, useEffect } from 'react';
import { useZxing } from 'react-zxing';
import { Dialog, DialogContent, IconButton, Box, Typography, CircularProgress } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface BarcodeScannerProps {
  open: boolean;
  onClose: () => void;
  onScan: (result: string) => void;
}

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ open, onClose, onScan }) => {
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);

  const { ref, torch } = useZxing({
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
        facingMode: { exact: "environment" },
        width: { ideal: 1280 },
        height: { ideal: 720 }
      }
    },
    timeBetweenDecodingAttempts: 300,
  });

  useEffect(() => {
    if (open) {
      setIsLoading(true);
      navigator.mediaDevices.getUserMedia({ video: { facingMode: { exact: "environment" } } })
        .then(() => {
          setHasPermission(true);
          setError('');
        })
        .catch((err) => {
          console.error('Camera permission error:', err);
          setError('Camera access denied. Please grant camera permissions.');
          setHasPermission(false);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [open]);

  const handleVideoLoad = () => {
    setIsLoading(false);
  };

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
          zIndex: 2
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
          ) : isLoading ? (
            <CircularProgress color="primary" />
          ) : (
            <>
              <video 
                ref={ref}
                onLoadedData={handleVideoLoad}
                autoPlay
                playsInline
                muted
                style={{ 
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '80%',
                  height: '200px',
                  border: '2px solid white',
                  borderRadius: '8px',
                  boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.5)',
                }}
              />
              <Typography
                sx={{
                  position: 'absolute',
                  bottom: 32,
                  color: 'white',
                  textAlign: 'center',
                  width: '100%'
                }}
              >
                Position the VIN barcode within the frame
              </Typography>
            </>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default BarcodeScanner;