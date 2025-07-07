import { useForm, zodResolver } from '@mantine/form';
import { hoursRequest } from '../../types/hours';
import { addHoursSchema } from '../../types/schemas';
import { useEffect } from 'react';
import { Backdrop, Box, Button, Fade, Modal, Stack, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

// changes made: allow multiple images
const ModalBox = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: 400,
  maxHeight: '90vh',
  overflowY: 'auto',
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[24],
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius * 2,
}));

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
      imageUrls: [''],
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

  // update specific umage url; easier for multiple image url addition support
  const handleImageUrlChange = (idx: number, value: string) => {
    const urls = [...(form.values?.imageUrls || [])];
    urls[idx] = value;
    form.setFieldValue('imageUrls', urls);
  };

  // checker (extra)
  const handleAddImageInput = () => {
    if ((form.values?.imageUrls?.length || 0) < 5) {
      form.setFieldValue('imageUrls', [...(form.values?.imageUrls || []), '']);
    }
  };

  const handleRemoveImageInput = (idx: number) => {
    const urls = [...(form.values?.imageUrls || [])];
    urls.splice(idx, 1);
    form.setFieldValue('imageUrls', urls);
  };

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
        <ModalBox>
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
                imageUrl: form.values?.imageUrls.filter((url: string) => url), 
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
                  Set your images in Google Drive to be viewable by anyone with the link.
                </Typography>
                {form.values?.imageUrls?.map((url: string, idx: number) => (
                  <Stack direction="row" spacing={1} alignItems="center" key={idx} sx={{ mb: 1 }}>
                    <TextField
                      id={`image-url-input-${idx}`}
                      label={`Google Drive Image Link #${idx + 1}`}
                      variant="outlined"
                      required={idx === 0}
                      value={url}
                      onChange={(e) => {
                        const inputValue = e.target.value;
                        const imageId = inputValue.match(/file\/d\/(.*)\//g);
                        const newImageUrl = imageId
                          ? `https://drive.google.com/thumbnail?id=${imageId[0].split('/')[2]}&sz=w1000`
                          : inputValue;
                        handleImageUrlChange(idx, newImageUrl);
                      }}
                      onBlur={() => form.validateField('imageUrls')}
                      error={form.errors?.imageUrls ? true : false}
                      helperText={form.errors?.imageUrls}
                    />
                    {form.values?.imageUrls.length > 1 && (
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleRemoveImageInput(idx)}
                        sx={{ minWidth: 0, px: 1 }}
                      >
                        X
                      </Button>
                    )}
                  </Stack>
                ))}
                <Button
                  variant="outlined"
                  onClick={handleAddImageInput} 
                  disabled={form.values?.imageUrls?.length >= 5} // making sure <= 5 images; disable option at > 5
                  sx={{ mb: 1 }}
                >
                  Add Another Image
                </Button>
                <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
                  {(form.values?.imageUrls || []).filter(Boolean).map((url: string, idx: number) => (
                    <img
                      key={idx}
                      src={url || 'https://placehold.co/600x400?text=Image+Preview'}
                      style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 8 }}
                      alt={
                        form.values?.description
                          // check if desc is there and decide the alt text from there on
                          // truncating desc for overflow checks
                          ? `Proof picture ${idx + 1} for ${
                            form.values.description.length > 20
                              ? form.values.description.slice(0, 20) + '...'
                              : form.values.description
                          }`
                          : `Proof picture ${idx + 1}`
                      }
                    />
                  ))}
                </Stack>
              </Stack>
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
        </ModalBox>
      </Fade>
    </Modal>
  );
};
