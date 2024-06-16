import { Backdrop, CircularProgress, Stack, Typography } from '@mui/material';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['latin'] });

export default function LoadingOverlay({
  isLoading,
  isRedirecting = false,
}: {
  isLoading: boolean;
  isRedirecting?: boolean;
}) {
  return (
    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
      <Stack alignItems="center" spacing={2}>
        {isRedirecting && (
          <Typography className={montserrat.className} variant="h5">
            Redirecting...
          </Typography>
        )}
        <CircularProgress color="inherit" />
      </Stack>
    </Backdrop>
  );
}
