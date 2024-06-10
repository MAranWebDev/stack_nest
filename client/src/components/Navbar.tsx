import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';
import { AuthContext } from '@/features/auth/Auth.context';
import { DarkModeContext } from '@/features/dark-mode/DarkMode.context';

export const Navbar = () => {
  const { isDarkMode, handleDarkMode } = useContext(DarkModeContext);
  const { jwt, handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Switch checked={isDarkMode} onClick={handleDarkMode} />
      <Button variant="outlined" onClick={() => navigate(ROUTES.REGISTER)}>
        Register
      </Button>
      <Button variant="outlined" onClick={() => navigate(ROUTES.LOGIN)}>
        Login
      </Button>
      <Button
        sx={{ visibility: jwt ? 'visible' : 'hidden' }}
        variant="outlined"
        onClick={handleLogout}
      >
        Logout
      </Button>
    </Box>
  );
};
