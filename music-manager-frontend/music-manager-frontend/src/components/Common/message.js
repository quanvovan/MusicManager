import React, { useEffect, useState } from 'react';

import { Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

const Message = (props) => {
  const { status, message, openMessage, handleCloseMessage } = props;

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      open={openMessage}
      autoHideDuration={6000}
      onClose={handleCloseMessage}
    >
      <Alert
        elevation={6}
        variant="filled"
        onClose={handleCloseMessage}
        severity={status.toLowerCase()}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Message;
