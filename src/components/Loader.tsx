import React from 'react';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';

const LoaderContainer = styled.div`
  text-align: center;
`;

export const Loader = () => (
  <LoaderContainer>
    <CircularProgress />
  </LoaderContainer>
);
