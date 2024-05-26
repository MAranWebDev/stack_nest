import Typography from '@mui/material/Typography';

import { MainLayout } from '@/components/layouts';
import { LoginForm } from '@/features/auth/components';

export const LoginPage = () => {
  return (
    <MainLayout>
      <Typography sx={{ textAlign: 'center', my: 3 }} component="h1" variant="h4">
        Login Page
      </Typography>
      <LoginForm />
    </MainLayout>
  );
};
