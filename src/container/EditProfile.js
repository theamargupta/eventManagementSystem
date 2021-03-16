import React, { useEffect, useState } from 'react';
import {
  Divider,
  Grid,
  Typography,
  Button,
  TextField,
  Link,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
//helper
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import * as Yup from 'yup';

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
const DriverDetails = () => {
  const classes = useStyles();
  const {
    initialValues,
    onSubmit,
    validationSchema,
    setFieldValue,
  } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email('please enter valid email')
        .required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: (values) => {
      console.log('values', values);
    },
  });
  const [profile, setProfile] = useState({ name: '' });
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      return setProfile(user);
    }
  }, [setProfile]);
  useEffect(() => {
    setFieldValue('email', profile.email);
  }, [profile.email, setFieldValue]);

  // const initialValues = {
  //   email: profile.email,
  //   password: profile.password,
  // };
  // const validationSchema = Yup.object().shape({
  //   email: Yup.string().email('please enter valid email').required('Required'),
  //   password: Yup.string().required('Required'),
  // });

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Button
            variant='contained'
            component={Link}
            to='/driverlist'
            color='default'
          >
            <Typography variant='h6'>Back</Typography>
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h5'>Personal Details</Typography>
        </Grid>
        <Grid item xs={6}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '80%',
              justifyContent: 'center',
            }}
          >
            <img
              style={{
                objectFit: 'cover',
                width: '200px',
                height: '250px',
              }}
              src={'values.profile_picture' ? 'values.profile_picture' : ''}
              width='200'
              alt=''
            />
          </div>
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
        </Grid>
      </Grid>
      <Divider />{' '}
      <Grid item xs={6}>
        <Button type='submit' text='Submit'>
          Submit
        </Button>
      </Grid>
    </>
  );
};

export default DriverDetails;
