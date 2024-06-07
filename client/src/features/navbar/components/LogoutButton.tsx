import Button from '@mui/material/Button';
import { useContext } from 'react';

import { AuthContext } from '@/features/auth/Auth.context';

export const LogoutButton = () => {
  const { jwt, handleLogout } = useContext(AuthContext);

  return (
    <Button
      sx={{ visibility: jwt ? 'visible' : 'hidden' }}
      variant="outlined"
      onClick={handleLogout}
    >
      Logout
    </Button>
  );
};
