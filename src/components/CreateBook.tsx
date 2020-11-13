import React, { Fragment, useState } from 'react';
import Button from '@material-ui/core/Button';
import { EditBookModal } from './EditBookModal';

export const CreateBook = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleToggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <Fragment>
      <Button variant="contained" color="primary" onClick={handleToggleModal}>
        Create new
      </Button>

      <EditBookModal isOpen={isModalVisible} onClose={handleToggleModal} />
    </Fragment>
  );
};
