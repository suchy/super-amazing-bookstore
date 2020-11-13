import React, { EventHandler, MouseEvent } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

interface ModalProps {
  children: React.ReactNode;
  onClose: EventHandler<MouseEvent<HTMLButtonElement>>;
  title: string;
}

export const Modal = ({ children, onClose, title }: ModalProps) => (
  <Dialog open onClose={onClose}>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>{children}</DialogContent>
  </Dialog>
);
