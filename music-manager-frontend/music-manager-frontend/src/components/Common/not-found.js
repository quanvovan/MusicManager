import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Button } from '@material-ui/core';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { Redirect } from 'react-router';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    flexWrap: 'wrap',
    marginRight: '110px',
  },

  column: {
    width: 300,
    height: 'auto',
  },
  img: {
    maxWidth: 300,
    height: 'auto',
  },

  status: {
    fontSize: '7.5em',
    margin: '15px 0px',
    fontWeight: 'bold',
    lineHeight: '1.2',
  },

  message: {
    fontSize: '2em',
    marginBottom: '.5rem',
    fontWeight: 'bold',
  },

  btn: {
    margin: '1rem 0px',
    padding: '8px 40px',
    borderRadius: '30px',
    transitionDuration: '0.6s',
    '&:hover': {
      backgroundColor: '#3f51b5',
      color: '#ffffff',
    },
  },
}));

const notfound = (props) => {
  const classes = useStyles();
  useEffect(() => {
    document.title = 'Error Page';
  }, []);
  return (
    <div className={classes.container}>
      <div className={classes.column}>
        <img
          className={classes.img}
          src="https://img.freepik.com/free-vector/note-music-logo-design_93835-645.jpg?size=338&ext=jpg"
          alt="music"
        />
      </div>
      <div className={classes.column}>
        <h1 className={classes.status}>404</h1>
        <h2 className={classes.message}>UH OH! You're lost.</h2>
        <p>
          The page you are looking for does not exist. How you got here is a
          mystery. But you can click the button below to go back to the
          homepage.
        </p>
        <Button
          className={classes.btn}
          variant="outlined"
          color="primary"
          startIcon={<KeyboardBackspaceIcon />}
          onClick={() => {
            props.history.push('/');
            window.location.reload;
          }}
        >
          Home
        </Button>
      </div>
    </div>
  );
};

export default notfound;
