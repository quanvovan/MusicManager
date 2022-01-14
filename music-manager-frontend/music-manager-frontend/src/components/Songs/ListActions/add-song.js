import React, { useContext, useEffect, useState } from 'react';
import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  Typography,
  Button,
  withStyles,
  LinearProgress,
} from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import SongService from '../../../apis/song';
import LanguageContext from '../../../contexts/LanguageContext';

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 15,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: '#EEEEEE',
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#1a90ff',
  },
}))(LinearProgress);

export default function FormDialog(props) {
  const initialSong = {
    id: null,
    name: '',
    genre: '',
    timeUpdate: '',
  };
  const { open, handleClose, sendMessage, refreshData } = props;
  const [song, setSong] = useState(initialSong);
  const [selectedFile, setSelectedFile] = useState(undefined);
  const [progress, setProgress] = useState(0);
  const { language } = useContext(LanguageContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    //console.log(name);
    setSong({ ...song, [name]: value });
  };

  const saveSong = () => {
    var formData = new FormData();
    formData.append('file', selectedFile[0]);
    formData.append('name', song.name);
    formData.append('genre', song.genre);
    formData.append('timeUpdate', new Date().toLocaleString('vi'));

    SongService.create(formData, (event) => {
      setProgress(Math.round((100 * event.loaded) / event.total));
    })
      .then((response) => {
        if (response.data.status === 'success') {
          setSong({
            id: response.data.data.id,
            name: response.data.data.name,
            genre: response.data.data.genre,
            timeUpdate: response.data.data.timeUpdate,
          });
          refreshData();
        }

        sendMessage(response.data.status, response.data.message);
        setSelectedFile(undefined);
        handleClose();
      })
      .catch((e) => {
        //sendMessage('error', 'Sorry, an unexpected error occurred !!!');
        console.log(e);
      });
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">{language.addSong}</DialogTitle>
      <DialogContent>
        <DialogContentText>{language.describeAdd}</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          name="name"
          label={language.name}
          type="text"
          fullWidth
          //value={song.name}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          name="genre"
          label={language.genre}
          type="text"
          fullWidth
          //value={song.genre}
          onChange={handleInputChange}
        />
        <input
          accept=".mp3,audio/*"
          style={{ display: 'none', margin: '20px' }}
          id="contained-button-file"
          multiple
          type="file"
          onChange={(e) => {
            setProgress(0);
            setSelectedFile(e.target.files);
          }}
        />
        <label htmlFor="contained-button-file">
          <Button
            style={{ margin: '10px 10px 10px 0' }}
            size="large"
            variant="contained"
            color="default"
            component="span"
            startIcon={<CloudUploadIcon />}
          >
            {language.upload}
          </Button>
        </label>
        <span>{selectedFile !== undefined ? selectedFile[0].name : null}</span>
        {selectedFile && (
          <Box className="mb25" display="flex" alignItems="center">
            <Box width="100%" mr={1}>
              <BorderLinearProgress variant="determinate" value={progress} />
            </Box>
            <Box minWidth={35}>
              <Typography
                variant="body2"
                color="textSecondary"
              >{`${progress}%`}</Typography>
            </Box>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="default">
          {language.cancel}
        </Button>
        <Button onClick={saveSong} color="primary">
          {language.add}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
