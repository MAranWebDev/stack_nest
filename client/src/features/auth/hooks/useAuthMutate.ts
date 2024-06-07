import { useMutation } from '@tanstack/react-query';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';
import { AuthContext } from '@/features/auth/Auth.context';
import { authService } from '@/features/auth/auth.service';
import { ACTIONS } from '@/features/auth/constants';
import { NavbarContext } from '@/features/navbar/Navbar.context';

export const useAuthMutate = (action: ACTIONS) => {
  const condition = action === ACTIONS.LOGIN ? true : false;

  const { handleLoader: handleLoadingState, isError, isPending } = useContext(NavbarContext);
  const { handleValues: handleAuthState } = useContext(AuthContext);
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: condition ? authService.login : authService.register,
    onMutate: () => {
      handleLoadingState({ isPending: true });
    },
    onSettled: () => {
      handleLoadingState({ isPending: false });
    },
    onSuccess: ({ token, name, role }) => {
      handleAuthState({ jwt: token, user: name, userRole: role });
      navigate(ROUTES.DASHBOARD);
    },
    onError: ({ message }) => {
      handleLoadingState({ isError: true, errorMessage: message });
    },
  });

  return { mutate, isError, isPending };
};
