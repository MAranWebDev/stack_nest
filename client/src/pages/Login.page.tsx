import { MainLayout } from '@/components/layouts';
import { LoginForm } from '@/features/auth/components';

export const LoginPage = () => {
  return (
    <MainLayout>
      <h1>Login Page</h1>
      <LoginForm />
    </MainLayout>
  );
};
