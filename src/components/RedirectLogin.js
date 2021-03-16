import { Typography } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

const RedirectLogin = () => {
  return (
    <Typography>
      Please Login First?
      <Link
        to='/login'
        // onClick={() => history.push('login')}
      >
        {' '}
        Login
      </Link>
    </Typography>
  );
};

export default RedirectLogin;
