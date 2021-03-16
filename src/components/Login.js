import React from 'react';
import { Grid, Avatar, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';
import Img from 'assets/event-management-concept-sketch-doodle-horizontal-vector-22928507.jpg';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    minHeight: '100vh',
  },
  subContainer: {
    padding: theme.spacing(2),
  },
  subContainer2: {
    padding: theme.spacing(2),
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  avatar: { backgroundColor: '#999' },
  btn: {
    marginRight: '10px',
    padding: theme.spacing(2),
    borderRadius: '4px',
    minWidth: '180px',
    fontSize: '16px',
  },
  btnDiv: { display: 'flex' },
  email: {
    margin: '10px 0',
  },
  password: {
    margin: '10px 0',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
  },
}));

const Login = () => {
  const history = useHistory();
  const classes = useStyles();
  const initialValues = {
    email: '',
    password: '',
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
        history.push('/');
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
    <Grid container className={classes.mainContainer}>
      <Grid item xs={12} sm={6}>
        <img className={classes.img} src={Img} alt='brand' />
      </Grid>
      <Grid
        container
        item
        xs={12}
        sm={6}
        alignItems='center'
        direction='column'
        justify='space-between'
        spacing={2}
      >
        <div />
        <div>
          <Grid
            container
            direction='column'
            justify='center'
            className={classes.subContainer}
          >
            <Grid item alignItems='flex-start'>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
            </Grid>
            <Grid item alignItems='flex-start'>
              <h2>Welcome back, Please Sign In into your account</h2>
            </Grid>
          </Grid>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            {(props) => (
              <Form className={classes.form}>
                <Field
                  as={TextField}
                  label='Email'
                  className={classes.email}
                  variant={'outlined'}
                  name='email'
                  placeholder='Enter Email'
                  // fullWidth
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
                  // fullWidth
                  helperText={<ErrorMessage name='password' />}
                />
                <div className={classes.btnDiv}>
                  <Button
                    type='submit'
                    color='primary'
                    variant='contained'
                    disabled={props.isSubmitting}
                    className={classes.btn}
                    // fullWidth
                  >
                    {props.isSubmitting ? 'Loading' : 'Sign in'}
                  </Button>
                  <Button
                    // color='secondary'
                    variant='contained'
                    disabled={props.isSubmitting}
                    className={classes.btn}
                    onClick={() => history.push('signup')}
                  >
                    {'Create Account'}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
        <div />
      </Grid>
    </Grid>
  );
};

export default Login;
