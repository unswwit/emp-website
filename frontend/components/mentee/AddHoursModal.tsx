import { useForm, zodResolver } from '@mantine/form';
import { hoursRequest } from '../../types/hours';
import { addHoursSchema } from '../../types/schemas';
import { useEffect } from 'react';
import {
  Backdrop,
  Box,
  Button,
  Fade,
  Modal,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

export const AddHoursModal = ({
  isOpen,
  onAdd,
  onClose,
}: {
  isOpen: boolean;
  onAdd: (menteeHours: hoursRequest) => void;
  onClose: () => void;
}) => {
  const form = useForm({
    validate: zodResolver(addHoursSchema),
  });

  const initForm = () => {
    form.setValues({
      hours: 0,
      description: '',
    });

    form.clearErrors();
  };

  useEffect(() => {
    initForm();
  }, [isOpen]);

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
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" component="h2">
            Add Hours Request
          </Typography>
          <Typography sx={{ mt: 2 }}>
            Please convert your minutes to hours.
          </Typography>
          <Typography sx={{ mb: 2, mt: 1 }}>
            e.g., 45 minutes is 0.75, 30 minutes is 0.5, 15 minutes is 0.25.
          </Typography>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (form.validate().hasErrors) return;

              const currentDate = new Date().toLocaleDateString();

              onAdd({
                numHours: form.values?.hours,
                description: form.values?.description,
                timestamp: currentDate,
                imageUrl: '',
              });
            }}
          >
            <Stack sx={{ mb: 2 }} spacing={1}>
              <TextField
                id="hours-input"
                label="Hours"
                variant="outlined"
                type="number"
                inputProps={{ step: '0.01' }}
                required
                autoFocus
                onChange={(e) => form?.setFieldValue('hours', +e.target.value)}
                onBlur={() => form.validateField('hours')}
                error={form.errors?.hours ? true : false}
                helperText={form.errors?.hours}
              />
              <TextField
                id="description-input"
                label="Description"
                variant="outlined"
                rows={2}
                multiline
                required
                onChange={(e) =>
                  form?.setFieldValue('description', e.target.value)
                }
                onBlur={() => form.validateField('description')}
                error={form.errors?.description ? true : false}
                helperText={form.errors?.description}
              />
            </Stack>
            <Stack direction="row" justifyContent="end" spacing={2}>
              <Button variant="outlined" onClick={onClose}>
                Cancel
              </Button>
              <Button variant="contained" type="submit">
                Send Request
              </Button>
            </Stack>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
};
