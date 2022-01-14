import React, { useEffect, useState } from 'react';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AuthService from '../../../apis/auth';
import { VerifiedUser, Email, Home, ExitToApp } from '@material-ui/icons';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Redirect } from 'react-router-dom';

const StyledBadge = withStyles((theme) => ({
  badge: {
    width: theme.spacing(2),
    height: theme.spacing(2),
    borderRadius: '50%',
    backgroundColor: '#44b700',
    color: '#44b700',
    top: 190,
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}))(Badge);

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
    flexDirection: 'column',
  },
  avatar: {
    minWidth: theme.spacing(20),
    minHeight: theme.spacing(20),
    top: 70,
  },
  header: {
    position: 'relative',
    backgroundColor: '#5257F2',
    height: 200,
    minwidth: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'flex-end',
    display: 'flex',
  },
  username: {
    marginLeft: 40,
  },
  info: {
    flexGrow: 1,
    overflow: 'hidden',
    padding: theme.spacing(0, 3),
    marginTop: 80,
  },
  paper: {
    maxWidth: 500,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
  action: {
    position: 'fixed',
    right: 0,
    top: '50%',
    width: 50,
    padding: 10,
  },
}));

export default function profile(props) {
  const classes = useStyles();
  const currentUser = AuthService.getCurrentUser();

  return (
    <>
      {currentUser ? (
        <div className={classes.root}>
          <div className={classes.header}>
            <StyledBadge
              overlap="circle"
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              variant="dot"
            >
              <Avatar
                alt="Avatar"
                src="https://material-ui.com/static/images/avatar/1.jpg"
                className={classes.avatar}
              />
            </StyledBadge>
            <div className={classes.username}>
              <h1>{currentUser.username}</h1>
            </div>
            <div style={{ width: 200 }}></div>
          </div>
          <div className={classes.info}>
            <Paper className={classes.paper}>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                wrap="nowrap"
                spacing={4}
              >
                <Grid item>
                  <Avatar>
                    <Email />
                  </Avatar>
                </Grid>
                <Grid item xs>
                  <h2>Email: {currentUser.email}</h2>
                </Grid>
              </Grid>
            </Paper>
            <Paper className={classes.paper}>
              <Grid
                direction="row"
                justify="center"
                alignItems="center"
                container
                wrap="nowrap"
                spacing={4}
              >
                <Grid item>
                  <Avatar>
                    <VerifiedUser />
                  </Avatar>
                </Grid>
                <Grid item xs>
                  <h2 className={classes.mf10}>Authorities: </h2>
                  <ul>
                    {currentUser &&
                      currentUser.roles.map((role, index) => (
                        <li key={index}>{role}</li>
                      ))}
                  </ul>
                </Grid>
              </Grid>
            </Paper>
          </div>
          <div className={classes.action}>
            <Fab
              color="primary"
              aria-label="home"
              onClick={() => {
                props.history.push('/');
                window.location.reload;
              }}
            >
              <Home />
            </Fab>
            <Fab
              color="secondary"
              aria-label="logout"
              style={{ marginTop: 10 }}
              onClick={() => {
                AuthService.logout();
                props.history.push('/login');
                window.location.reload;
              }}
            >
              <ExitToApp />
            </Fab>
          </div>
        </div>
      ) : (
        <Redirect to="/login" />
      )}
    </>
  );
}
