import React from 'react';
import { Button, CircularProgress } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SendIcon from '@mui/icons-material/Send';

interface BackButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export const BackButton: React.FC<BackButtonProps> = ({ onClick, disabled }) => (
  <Button
    variant="contained"
    color="primary"
    onClick={onClick}
    startIcon={<ArrowBackIcon />}
    disabled={disabled}
  >
    Back
  </Button>
);

interface NextButtonProps {
  loading: boolean;
  disabled?: boolean;
  buttonText?: string;
}

export const NextButton: React.FC<NextButtonProps> = ({ loading, disabled = true, buttonText = "Next" }) => (
    <>
        {loading ?
            <CircularProgress size={24} />
        :
            <Button
                variant="contained"
                color="primary"
                type='submit'
                endIcon={<SendIcon />}
                disabled={disabled}
            >
                {buttonText}
            </Button>
        }
    </>
);