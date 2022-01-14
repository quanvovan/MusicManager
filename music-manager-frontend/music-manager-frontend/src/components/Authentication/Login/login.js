import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  Typography,
  Container,
  CircularProgress,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn(props) {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorUsername, setErrorUsername] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [openMessage, setOpenMessage] = useState(false);

  const handleCloseMessage = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenMessage(false);
  };

  const checkUsername = (username) => {
    const regex = /^[A-Za-z][A-Za-z0-9]+$/;
    if (username === '') {
      setErrorUsername('Username is required.');
    } else if (username.length < 4) {
      setErrorUsername('Username cannot be less than 4 characters.');
    } else if (!regex.test(username)) {
      setErrorUsername('Username is not valid.');
    } else {
      setErrorUsername('');
    }
  };

  const checkPassword = (password) => {
    if (password === '') {
      setErrorPassword('Password is required.');
    } else if (password.length < 6) {
      setErrorPassword('Password cannot be less than 6 characters.');
    } else {
      setErrorPassword('');
    }
  };

  async function handleLogin(e) {
    setLoading(true);

    e.preventDefault();

    await AuthService.login(username, password).then(
      () => {
        props.history.push('/profile');
        window.location.reload;
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setLoading(false);
        setMessage(resMessage);
        setOpenMessage(true);
      }
    );

    setLoading(false);
  }
  useEffect(() => {
    document.title = 'Login Page';
  }, []);
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleLogin} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            value={username}
            onChange={(e) => {
              checkUsername(e.target.value);
              setUsername(e.target.value);
            }}
            autoFocus
            error={errorUsername !== '' ? true : false}
            helperText={errorUsername}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={(e) => {
              checkPassword(e.target.value);
              setPassword(e.target.value);
            }}
            autoComplete="current-password"
            error={errorPassword !== '' ? true : false}
            helperText={errorPassword}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={
              errorUsername !== '' ||
              errorPassword !== '' ||
              username === '' ||
              password === ''
            }
          >
            {loading ? <CircularProgress size={24} /> : 'Sign In'}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="#" style={{ color: '#3f51b5', textDecoration: 'none' }}>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link
                to="/register"
                style={{ color: '#3f51b5', textDecoration: 'none' }}
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>

      <Message
        status={'error'}
        message={message}
        openMessage={openMessage}
        handleCloseMessage={handleCloseMessage}
      />
    </Container>
  );
}
