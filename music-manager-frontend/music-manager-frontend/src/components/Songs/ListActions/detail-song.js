import React, { useContext, useEffect, useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import SongService from '../../../apis/song';
import { API_URL } from '../../../constants/Contants';
import LanguageContext from '../../../contexts/LanguageContext';

import {
  createMuiTheme,
  ThemeProvider,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
} from '@material-ui/core';
import AudioPlayer from 'material-ui-audio-player';

const useStyles = makeStyles((theme) => ({
  title: {
    backgroundColor: '#c5cae9',
    padding: 25,
  },
  audioPlayer: {
    marginLeft: 30,
    marginTop: 5,
  },
  mgTop: {
    marginTop: 20,
  },
  textName: {
    marginTop: 40,
  },
  mgLeft: {
    marginLeft: 10,
  },
}));

export default function DetailSong(props) {
  const {
    open,
    handleClose,
    isEditForm,
    handleOpenModalDel,
    handleOpenEditForm,
    data,
    setData,
    sendMessage,
    refreshData,
  } = props;
  //console.log(data);
  const [song, setSong] = useState();
  const [pause, setPause] = useState(false);
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    if (data) {
      setSong(data);
    }
  }, [data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    //console.log(name);
    setSong({ ...song, [name]: value });
  };
  const classes = useStyles();
  const muiTheme = createMuiTheme({});

  const updateSong = () => {
    var formData = new FormData();
    formData.append('name', song.name);
    formData.append('genre', song.genre);
    formData.append('timeUpdate', new Date().toLocaleString('vi'));
    formData.append('path', song.path);

    SongService.update(data.id, formData)
      .then((response) => {
        setSong({
          id: response.data.data.id,
          name: response.data.data.name,
          genre: response.data.data.genre,
          timeUpdate: response.data.data.timeUpdate,
        });
        sendMessage(response.data.status, response.data.message);
        refreshData();
      })
      .catch((e) => {
        sendMessage('error', 'Sorry, an unexpected error occurred !!!');
      });
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        setData([]);
        setPause(true);
        handleClose();
      }}
      aria-labelledby="form-dialog-title"
      fullWidth={true}
    >
      <DialogTitle id="form-dialog-title" className={classes.title}>
        {language.songDetails}
      </DialogTitle>
      <Divider />
      {data.path !== undefined ? (
        <div className={classes.audioPlayer}>
          <ThemeProvider theme={muiTheme}>
            <AudioPlayer
              elevation={5}
              width="100%"
              variation="primary"
              spacing={4}
              download={true}
              autoplay={true}
              order="reverse"
              preload="auto"
              loop={true}
              src={API_URL + '/' + data.path}
              //onPaused={pause ? (player) => player.pause() : {}}
            />
          </ThemeProvider>
        </div>
      ) : (
        <></>
      )}
      <DialogContent>
        {isEditForm ? (
          <div>
            <TextField
              autoFocus
              margin="dense"
              name="name"
              label={language.name}
              type="text"
              className={classes.mgTop}
              fullWidth
              defaultValue={data.name}
              onChange={handleInputChange}
            />
            <TextField
              autoFocus
              margin="dense"
              name="genre"
              label={language.genre}
              type="text"
              className={classes.mgTop}
              fullWidth
              defaultValue={data.genre}
              onChange={handleInputChange}
            />
          </div>
        ) : (
          <div>
            <DialogContentText className={classes.textName}>
              {language.name}:
              <span className={classes.mgLeft}>{data.name}</span>
            </DialogContentText>
            <DialogContentText className={classes.mgTop}>
              {language.genre}:
              <span className={classes.mgLeft}>{data.genre}</span>
            </DialogContentText>
          </div>
        )}
        <DialogContentText className={classes.mgTop}>
          {language.lastUpdate}:
          <span className={classes.mgLeft}>{data.timeUpdate}</span>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {isEditForm ? (
          <Button
            onClick={() => {
              updateSong();
              handleClose();
            }}
            color="primary"
          >
            {language.save}
          </Button>
        ) : (
          <Button onClick={() => handleOpenEditForm(data)} color="primary">
            {language.edit}
          </Button>
        )}
        <Button
          onClick={() => {
            handleOpenModalDel();
            handleClose();
          }}
          color="secondary"
        >
          {language.delete}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
