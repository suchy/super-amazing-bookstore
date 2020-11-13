import React from 'react';
import Alert from '@material-ui/lab/Alert';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => (
  <Alert severity="error">{message}</Alert>
);
