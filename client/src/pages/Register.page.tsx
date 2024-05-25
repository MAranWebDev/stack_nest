import { MainLayout } from '@/components/layouts';
import { RegisterForm } from '@/features/auth/components';

export const RegisterPage = () => {
  return (
    <MainLayout>
      <h1>Register</h1>
      <RegisterForm />
    </MainLayout>
  );
};
