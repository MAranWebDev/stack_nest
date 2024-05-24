import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

export const UnauthorizedPage = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <Stack
      sx={{
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        mx: '10%',
      }}
      spacing={2}
      component="main"
    >
      <Typography component="h1" variant="h2">
        Unauthorized
      </Typography>
      <Divider flexItem />
      <p>You do not have access to the requested page.</p>
      <Button variant="contained" onClick={goBack}>
        Go Back
      </Button>
    </Stack>
  );
};
