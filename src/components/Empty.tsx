import React from 'react';
import Alert from '@material-ui/lab/Alert';

export const Empty = () => (
  <Alert severity="info" data-testid="Empty">
    There are no books. You can add it.
  </Alert>
);
