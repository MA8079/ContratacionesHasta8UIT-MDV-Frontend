
import React, { useEffect, useState } from 'react';
import { Alert, AlertTitle, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function AlertComponent({
  variant,
  severity,
  visible,
  title,
  actionClose = () => { },
}: any) {
  const [showAlert, setShowAlert] = useState(visible);
  const handlerClose = (e: any) => {
    setShowAlert(false);
    actionClose();
  }
  useEffect(() => {
    setShowAlert(visible);
  }, [visible])
  return (
    <div>
      {showAlert && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            position: 'fixed',
            top: 0,
            right: 0,
            padding: '32px 40px',
            zIndex: 'tooltip',
          }}
        >
          <Alert
            severity={severity}
            variant={variant}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={handlerClose}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <AlertTitle>{title}</AlertTitle>
            </div>
          </Alert>
        </Box>
      )}
    </div>

  );
}
