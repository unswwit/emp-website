import { Backdrop, Box, Button, Fade, Modal, Stack } from '@mui/material';
import { hoursImage } from '../../types/hours';
import { UnstyledButton } from '@mantine/core';

export const ViewImageModal = ({
  isOpen,
  onClose,
  image,
}: {
  isOpen: boolean;
  onClose: () => void;
  image: hoursImage;
}) => {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={isOpen}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={isOpen}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80vw',
            height: '80vh',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Stack spacing={2} sx={{ height: '100%', justifyContent: 'space-between' }}>
            <UnstyledButton
              sx={{ height: '90%', width: '100%', display: 'flex', justifyContent: 'center' }}
              onClick={onClose}
            >
              <img src={image.imageSrc} alt={image.imageAlt} style={{ height: '100%' }} />
            </UnstyledButton>
            <Button variant="outlined" sx={{ height: '10%' }} onClick={onClose}>
              Close
            </Button>
          </Stack>
        </Box>
      </Fade>
    </Modal>
  );
};
