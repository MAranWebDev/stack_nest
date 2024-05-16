import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export const LoginForm = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <TextField label="Email" required />
      <TextField label="Password" required />
      <Button>Login</Button>
    </Box>
  );
};
