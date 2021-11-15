import React from 'react';
import {
  Modal, Box, Button, Typography,
} from '@mui/material';

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  message: string;
  buttonText: string;
  buttonOnClick: () => void;
  secondButtonText: string;
  secondButtonOnClick: () => void;
}

const ConfirmEditEventModal = ({
  isModalOpen,
  setIsModalOpen,
  title,
  message,
  buttonText,
  buttonOnClick,
  secondButtonText,
  secondButtonOnClick,
}: Props) => {
  return (
    <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        borderRadius: '4px',
        pt: 2,
        px: 4,
        pb: 3,
      }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {title}
        </Typography>
        <Typography id="modal-modal-description" sx={{ my: 2 }}>
          {message}
        </Typography>
        <Box>
          <Button
            onClick={buttonOnClick}
            variant="contained"
            color="success"
            sx={{ marginRight: '1rem' }}
          >
            {buttonText}
          </Button>
          <Button onClick={secondButtonOnClick} variant="contained" color="error">
            {secondButtonText}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ConfirmEditEventModal;
