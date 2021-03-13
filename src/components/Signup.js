import React from 'react';
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
} from '@material-ui/core';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { FormHelperText } from '@material-ui/core';
import * as Yup from 'yup';
import { useHistory } from 'react-router';
import Swal from 'sweetalert2';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: 20,
    minHeight: '73vh',
    width: 340,
    margin: '0 auto',
  },
  avatar: { backgroundColor: '#999' },
  btn: { margin: '8px 0' },
  fieldset: { margin: '0' },
  header: { marginTop: '5px' },
  email: {
    margin: '10px 0',
  },
  password: {
    margin: '10px 0',
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
    history.push('/home');
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
    <Grid>
      <Paper className={classes.paper}>
        <Grid align='center'>
          <Avatar className={classes.avatar}>
            <AddCircleOutlineOutlinedIcon />
          </Avatar>
          <h2 className={classes.header}>Sign Up</h2>
          <Typography variant='caption' gutterBottom>
            Please fill this form to create an account !
          </Typography>
        </Grid>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(props) => (
            <Form>
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
              <Button
                type='submit'
                variant='contained'
                disabled={props.isSubmitting}
                color='primary'
                className={classes.btn}
                fullWidth
              >
                {props.isSubmitting ? 'Loading' : 'Sign up'}
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Grid>
  );
};

export default Signup;
