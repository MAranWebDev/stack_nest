import Typography from '@mui/material/Typography';

import { MainLayout } from '@/components/layouts';
import { RegisterForm } from '@/features/auth/components';

export const RegisterPage = () => {
  return (
    <MainLayout>
      <Typography sx={{ textAlign: 'center', my: 3 }} component="h1" variant="h4">
        Register Page
      </Typography>
      <RegisterForm />
    </MainLayout>
  );
};
