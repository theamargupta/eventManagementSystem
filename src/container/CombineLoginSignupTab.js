import React, { useEffect, useState } from 'react';
import { Paper, Tabs, Tab, Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// components
import Login from 'components/Login';
import Signup from 'components/Signup';

const useStyles = makeStyles((theme) => ({
  mainDiv: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#000',
    minWidth: '100vw',
  },
  paper: {
    minWidth: 380,
    border: '40px solid transparent',
    borderImage:
      'url(https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8ZXZlbnR8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80) 90 round',
    margin: '0px auto',
  },
}));

const LoginSignupTab = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  useEffect(() => {
    console.log(localStorage.getItem('user'));
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role='tabpanel'
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  return (
    <div className={classes.mainDiv}>
      <Paper className={classes.paper}>
        <Tabs
          value={value}
          indicatorColor='primary'
          textColor='primary'
          onChange={handleChange}
          aria-label='disabled tabs example'
        >
          <Tab label='Sign In' />

          <Tab label='Sign Up' />
        </Tabs>
        <TabPanel value={value} index={0}>
          <Login handleChange={handleChange} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Signup />
        </TabPanel>
      </Paper>
    </div>
  );
};

export default LoginSignupTab;
