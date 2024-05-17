import Box from '@mui/material/Box';
import { FormEventHandler, PropsWithChildren } from 'react';

interface PropsType {
  onSubmit: FormEventHandler<HTMLFormElement>;
}

export const FormLayout = ({ children, onSubmit }: PropsWithChildren<PropsType>) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        mx: 'auto',
        p: 6,
        width: 500,
        border: 1,
        borderRadius: 1,
        borderColor: 'text.disabled',
      }}
      component="form"
      autoComplete="off"
      onSubmit={onSubmit}
    >
      {children}
    </Box>
  );
};
