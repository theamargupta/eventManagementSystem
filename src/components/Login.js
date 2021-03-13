import React from 'react';
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: 20,
    height: '73vh',
    width: 340,
    margin: '0 auto',
  },
  avatar: { backgroundColor: '#000' },
  btn: { margin: '8px 0' },
  email: {
    margin: '10px 0',
  },
  password: {
    margin: '10px 0',
  },
}));

const Login = ({ handleChange }) => {
  const history = useHistory();
  const classes = useStyles();
  const initialValues = {
    email: '',
    password: '',
    remember: false,
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('please enter valid email').required('Required'),
    password: Yup.string().required('Required'),
  });
  const onSubmit = (values, props) => {
    console.log(values);
    let data = localStorage.getItem('user');
    if (data) {
      data = JSON.parse(data);
      if (data.email === values.email && data.password === values.password) {
        history.push('/home');
        console.log('login sucess');
      } else {
        console.log(data.email);
        console.log(values.email);
        console.log(data.password);
        console.log(values.password);
        Swal.fire({
          icon: 'error',
          title: "Oops.. Email Password doesn't match!",
          text: 'Please try Again',
          confirmButtonText: `Okay I'll try`,
        });
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops.. No Account Found!',
        text: 'Please Create a Account',
        showConfirmButton: false,
        timer: 1500,
      });
    }
    setTimeout(() => {
      props.resetForm();
      props.setSubmitting(false);
    }, 2000);
  };

  return (
    <Grid>
      <Paper className={classes.paper}>
        <Grid align='center'>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Sign In</h2>
        </Grid>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {(props) => (
            <Form>
              <Field
                as={TextField}
                label='Email'
                className={classes.email}
                variant={'outlined'}
                name='email'
                placeholder='Enter Email'
                fullWidth
                // required

                helperText={<ErrorMessage name='email' />}
              />
              <Field
                as={TextField}
                label='Password'
                className={classes.password}
                variant={'outlined'}
                name='password'
                placeholder='Enter password'
                type='password'
                fullWidth
                // required
                helperText={<ErrorMessage name='password' />}
              />
              <Field
                mt={2}
                as={FormControlLabel}
                name='remember'
                control={<Checkbox color='primary' />}
                label='Remember me'
              />
              <Button
                type='submit'
                color='primary'
                variant='contained'
                disabled={props.isSubmitting}
                className={classes.btn}
                fullWidth
              >
                {props.isSubmitting ? 'Loading' : 'Sign in'}
              </Button>
            </Form>
          )}
        </Formik>
        <Typography>
          New to EMS ?
          <Link href='#' onClick={() => handleChange('event', 1)}>
            {' '}
            Sign up now.
          </Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Login;
