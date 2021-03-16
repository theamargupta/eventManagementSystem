import React from 'react';
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Checkbox,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { AddCircleOutlineOutlinedIcon } from '@material-ui/icons';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { FormHelperText } from '@material-ui/core';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import Img from 'assets/event-management-concept-sketch-doodle-horizontal-vector-22928507.jpg';
import { Link, useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  avatar: { backgroundColor: theme.palette.primary },
  fieldset: { margin: '0' },
  header: { marginTop: '5px' },
  mainContainer: {
    minHeight: '80vh',
  },
  subContainer: {
    padding: theme.spacing(2, 6),
  },
  subContainer2: {
    padding: theme.spacing(2),
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
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

const Signup = () => {
  const history = useHistory();
  const classes = useStyles();
  const initialValues = {
    name: '',
    email: '',
    gender: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    termsAndConditions: false,
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().min(3, "It's too short").required('Required'),
    email: Yup.string().email('Enter valid email').required('Required'),
    gender: Yup.string()
      .oneOf(['male', 'female'], 'Required')
      .required('Required'),
    phoneNumber: Yup.number()
      .typeError('Enter valid Phone Number')
      .required('Required'),
    password: Yup.string()
      .min(8, 'Password minimum length should be 8')
      .required('Required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Password not matched')
      .required('Required'),
    termsAndConditions: Yup.string().oneOf(
      ['true'],
      'Accept terms & conditions'
    ),
  });
  const onSubmit = (values, props) => {
    console.log(values);
    console.log(props);
    localStorage.setItem('user', JSON.stringify(values));
    history.push('/');
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: `Hi ${values.name}`,
      text: 'Account Created Successfully',
      showConfirmButton: false,
      timer: 1500,
    });
  };
  return (
    <Grid container className={classes.mainContainer}>
      <Grid
        container
        item
        xs={12}
        sm={6}
        alignItems='flex-start'
        direction='column'
        justify='space-between'
        spacing={2}
        className={classes.subContainer}
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
              <Avatar className={classes.avatar}></Avatar>
            </Grid>
            <Grid item alignItems='flex-start'>
              <h2>Please fill this form to create an account !</h2>
            </Grid>
          </Grid>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(props) => (
              <Form className={classes.form}>
                <Field
                  as={TextField}
                  fullWidth
                  name='name'
                  className={classes.email}
                  variant={'outlined'}
                  label='Name'
                  placeholder='Enter your name'
                  helperText={<ErrorMessage name='name' />}
                />
                <Field
                  as={TextField}
                  fullWidth
                  name='email'
                  className={classes.email}
                  variant={'outlined'}
                  label='Email'
                  placeholder='Enter your email'
                  helperText={<ErrorMessage name='email' />}
                />
                <FormControl component='fieldset' className={classes.fieldset}>
                  <FormLabel component='legend'>Gender</FormLabel>
                  <Field
                    className={classes.email}
                    as={RadioGroup}
                    aria-label='gender'
                    name='gender'
                    style={{ display: 'initial' }}
                  >
                    <FormControlLabel
                      value='female'
                      control={<Radio />}
                      label='Female'
                    />
                    <FormControlLabel
                      value='male'
                      control={<Radio />}
                      label='Male'
                    />
                  </Field>
                </FormControl>
                <FormHelperText>
                  <ErrorMessage name='gender' />
                </FormHelperText>
                <Field
                  as={TextField}
                  fullWidth
                  name='phoneNumber'
                  className={classes.email}
                  variant={'outlined'}
                  label='Phone Number'
                  placeholder='Enter your phone number'
                  helperText={<ErrorMessage name='phoneNumber' />}
                />
                <Field
                  as={TextField}
                  fullWidth
                  name='password'
                  type='password'
                  label='Password'
                  className={classes.password}
                  variant={'outlined'}
                  placeholder='Enter your password'
                  helperText={<ErrorMessage name='password' />}
                />
                <Field
                  as={TextField}
                  fullWidth
                  name='confirmPassword'
                  type='password'
                  label='Confirm Password'
                  className={classes.password}
                  variant={'outlined'}
                  placeholder='Confirm your password'
                  helperText={<ErrorMessage name='confirmPassword' />}
                />
                <FormControlLabel
                  control={<Field as={Checkbox} name='termsAndConditions' />}
                  label='I accept the terms and conditions.'
                />
                <FormHelperText>
                  <ErrorMessage name='termsAndConditions' />
                </FormHelperText>
                <div className={classes.btnDiv}>
                  <Button
                    type='submit'
                    color='primary'
                    variant='contained'
                    disabled={props.isSubmitting}
                    className={classes.btn}
                    // fullWidth
                  >
                    {props.isSubmitting ? 'Loading' : 'Sign up'}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
          <Typography>
            Already Making A difference ?<Link to='/login'> Login</Link>
          </Typography>
        </div>
        <div />
      </Grid>
      <Grid item xs={12} sm={6}>
        <img className={classes.img} src={Img} alt='brand' />
      </Grid>
    </Grid>
  );
};

export default Signup;
