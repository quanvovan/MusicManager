import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';

import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Checkbox,
  Grid,
  Box,
  Typography,
  Container,
  InputAdornment,
  IconButton,
  CircularProgress,
} from '@material-ui/core';

import { LockOutlined, Visibility, VisibilityOff } from '@material-ui/icons/';

import { makeStyles } from '@material-ui/core/styles';

import AuthService from '../../../apis/auth';

import Message from '../../Common/message';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link to="/" style={{ color: '#3f51b5', textDecoration: 'none' }}>
        Music App
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  termAndPrivacy: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: -11,
  },
}));

export default function SignUp(props) {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    repassword: '',
    showPassword: false,
  });

  const [errorMessage, setErrorMessage] = useState({
    username: '',
    email: '',
    password: '',
    repassword: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [openMessage, setOpenMessage] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChangeCheckbox = (event) => {
    setChecked(event.target.checked);
  };

  const handleChange = (props, value) => {
    setValues({ ...values, [props]: value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  //console.log(errorUsername);
  const checkUsername = (username) => {
    const regex = /^[A-Za-z][A-Za-z0-9]+$/;
    if (username === '') {
      setErrorMessage({ ...errorMessage, username: 'Username is required.' });
    } else if (username.length < 4) {
      setErrorMessage({
        ...errorMessage,
        username: 'Username cannot be less than 4 characters.',
      });
    } else if (!regex.test(username)) {
      setErrorMessage({ ...errorMessage, username: 'Username is not valid.' });
    } else {
      setErrorMessage({ ...errorMessage, username: '' });
    }
  };

  const checkEmail = (email) => {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (email === '') {
      setErrorMessage({ ...errorMessage, email: 'Email is required.' });
    } else if (!regex.test(String(email).toLowerCase())) {
      setErrorMessage({ ...errorMessage, email: 'Email is not valid.' });
    } else {
      setErrorMessage({ ...errorMessage, email: '' });
    }
  };

  const checkPassword = (password) => {
    if (password === '') {
      setErrorMessage({ ...errorMessage, password: 'Password is required.' });
    } else if (password.length < 6) {
      setErrorMessage({
        ...errorMessage,
        password: 'Password cannot be less than 6 characters.',
      });
    } else {
      setErrorMessage({ ...errorMessage, password: '' });
    }
  };

  const checkRePassword = (repassword) => {
    if (repassword !== values.password) {
      setErrorMessage({
        ...errorMessage,
        repassword: 'Password is not matched.',
      });
    } else {
      setErrorMessage({ ...errorMessage, repassword: '' });
    }
  };

  const checkAllowSubmit = () => {
    if (
      values.username !== '' &&
      errorMessage.username === '' &&
      values.email !== '' &&
      errorMessage.email === '' &&
      values.password !== '' &&
      errorMessage.password === '' &&
      values.repassword !== '' &&
      errorMessage.repassword === '' &&
      checked
    ) {
      return true;
    }
    return false;
  };

  async function handleRegister(e) {
    e.preventDefault();

    setLoading(true);
    setMessage('');
    setSuccess(false);

    await AuthService.register(
      values.username,
      values.email,
      values.password
    ).then(
      (response) => {
        setMessage(response.data.message);
        setSuccess(true);
        setTimeout(() => {
          props.history.push('/login');
          window.location.reload;
        }, 6000);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setMessage(resMessage);
        setSuccess(false);
      }
    );

    setLoading(false);
    setOpenMessage(true);
  }

  const handleCloseMessage = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenMessage(false);
  };

  useEffect(() => {
    document.title = 'Register Page';
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleRegister} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoFocus
                onChange={(e) => {
                  handleChange('username', e.target.value);
                  checkUsername(e.target.value);
                }}
                value={values.username}
                error={errorMessage.username !== '' ? true : false}
                helperText={errorMessage.username}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e) => {
                  handleChange('email', e.target.value);
                  checkEmail(e.target.value);
                }}
                value={values.email}
                error={errorMessage.email !== '' ? true : false}
                helperText={errorMessage.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={values.password}
                onChange={(e) => {
                  handleChange('password', e.target.value);
                  checkPassword(e.target.value);
                }}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type={values.showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={(e) => e.preventDefault()}
                        edge="end"
                      >
                        {values.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                error={errorMessage.password !== '' ? true : false}
                helperText={errorMessage.password}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={values.repassword}
                onChange={(e) => {
                  handleChange('repassword', e.target.value);
                  checkRePassword(e.target.value);
                }}
                variant="outlined"
                required
                fullWidth
                name="repassword"
                label="Confirm Password"
                type={values.showPassword ? 'text' : 'password'}
                id="repassword"
                autoComplete="current-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={(e) => e.preventDefault()}
                        edge="end"
                      >
                        {values.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                error={errorMessage.repassword !== '' ? true : false}
                helperText={errorMessage.repassword}
              />
            </Grid>
            <Grid item xs={12}>
              <div className={classes.termAndPrivacy}>
                <Checkbox
                  checked={checked}
                  onChange={handleChangeCheckbox}
                  value="allowExtraEmails"
                  color="primary"
                />
                <span style={{ fontSize: 16 }}>
                  I agree to the{' '}
                  <Link
                    to="#"
                    style={{ color: '#3f51b5', textDecoration: 'none' }}
                  >
                    Terms of Use
                  </Link>{' '}
                  &amp;{' '}
                  <Link
                    to="#"
                    style={{ color: '#3f51b5', textDecoration: 'none' }}
                  >
                    Privacy Policy
                  </Link>
                  .
                </span>
              </div>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={!checkAllowSubmit()}
          >
            {loading ? <CircularProgress size={24} /> : 'Sign Up'}
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link
                to="/login"
                style={{ color: '#3f51b5', textDecoration: 'none' }}
              >
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
      <Message
        status={success ? 'success' : 'error'}
        message={message}
        openMessage={openMessage}
        handleCloseMessage={handleCloseMessage}
      />
    </Container>
  );
}
