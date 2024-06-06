import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

import { MainLayout } from '@/components/layouts';

const ROUTES = {
  BASE: window.location.origin,
  BACK: -1,
  LOGIN: '/login',
} as const;

export const UnauthorizedPage = () => {
  const navigate = useNavigate();
  const currentLocation = useLocation();

  const fromPathname = currentLocation.state?.from?.pathname;
  const previousUrl = ROUTES.BASE + fromPathname;

  return !fromPathname ? (
    <Navigate to={ROUTES.LOGIN} state={{ from: currentLocation }} replace />
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
            {previousUrl}
          </Typography>
        </p>
        <Button
          variant="contained"
          endIcon={<ExitToAppIcon />}
          onClick={() => navigate(ROUTES.BACK)}
        >
          Go Back
        </Button>
      </Stack>
    </MainLayout>
  );
};
