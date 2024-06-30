import { useForm, zodResolver } from '@mantine/form';
import { hoursRequest } from '../../types/hours';
import { addHoursSchema } from '../../types/schemas';
import { useEffect } from 'react';
import { Backdrop, Box, Button, Fade, Modal, Stack, TextField, Typography } from '@mui/material';

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
      imageUrl: '',
    });

    form.clearErrors();
  };

  useEffect(() => {
    initForm();
  }, [isOpen]);

  function getCurrentDateTime() {
    const now = new Date();
    const date = now.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    const time = now.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
    return `${date} ${time}`;
  }

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
          <Typography sx={{ mt: 2 }}>Please convert your minutes to hours.</Typography>
          <Typography sx={{ mb: 1, mt: 1 }}>
            e.g., 45 minutes is 0.75, 30 minutes is 0.5, 15 minutes is 0.25.
          </Typography>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (form.validate().hasErrors) return;

              const currentDateTime = getCurrentDateTime();

              onAdd({
                numHours: form.values?.hours,
                description: form.values?.description,
                timestamp: currentDateTime,
                imageUrl: form.values?.imageUrl,
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
                onChange={(e) => form?.setFieldValue('description', e.target.value)}
                onBlur={() => form.validateField('description')}
                error={form.errors?.description ? true : false}
                helperText={form.errors?.description}
              />
              <Stack>
                <Typography sx={{ mb: 1, mt: 2 }}>
                  Set your image in Google Drive to be viewable by anyone with the link.
                </Typography>
                <TextField
                  id="image-url-input"
                  label="Google Drive Image Link (for proof)"
                  variant="outlined"
                  required
                  onChange={(e) => {
                    const imageId = e.target.value.match(/file\/d\/(.*)\//g);
                    const newImageUrl = imageId
                      ? `https://drive.google.com/thumbnail?id=${imageId[0].split('/')[2]}&sz=w1000`
                      : e.target.value;

                    form?.setFieldValue('imageUrl', newImageUrl);
                  }}
                  onBlur={() => form.validateField('imageUrl')}
                  error={form.errors?.imageUrl ? true : false}
                  helperText={form.errors?.imageUrl}
                />
              </Stack>
              <img
                src={
                  form.values?.imageUrl
                    ? form.values?.imageUrl
                    : 'https://placehold.co/600x400?text=Image+Preview'
                }
                style={{ width: '100%', height: 250 }}
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
