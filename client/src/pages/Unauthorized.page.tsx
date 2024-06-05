import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

import { MainLayout } from '@/components/layouts';

const BASE_URL = window.location.origin;

export const UnauthorizedPage = () => {
  const navigate = useNavigate();
  const currentLocation = useLocation();

  const fromPathname = currentLocation.state?.from?.pathname;

  return !fromPathname ? (
    <Navigate to="/login" state={{ from: currentLocation }} replace />
  ) : (
    <MainLayout>
      <Stack
        sx={{ height: 1, alignItems: 'center', justifyContent: 'center', mx: '10%' }}
        spacing={2}
        component="section"
      >
        <Typography component="h1" variant="h2">
          Unauthorized
        </Typography>
        <Divider flexItem />
        <p>
          <span>You do not have access to: </span>
          <Typography sx={{ color: 'text.secondary' }} component="span" variant="subtitle2">
            {BASE_URL + fromPathname}
          </Typography>
        </p>
        <Button variant="contained" endIcon={<ExitToAppIcon />} onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </Stack>
    </MainLayout>
  );
};
