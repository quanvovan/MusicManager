import React, { useContext } from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';

import SongService from '../../../apis/song';
import LanguageContext from '../../../contexts/LanguageContext';

export default function DialogDeleteSong(props) {
  const {
    open,
    handleClose,
    sendMessage,
    data,
    selected,
    setSeleted,
    refreshData,
  } = props;

  const { language } = useContext(LanguageContext);

  //console.log(data);
  const deleteSong = (id) => {
    SongService.remove(id)
      .then((response) => {
        sendMessage(response.data.status, response.data.message);
        refreshData();
      })
      .catch((e) => {
        sendMessage('error', 'Sorry, an unexpected error occurred !!!');
      });
  };

  const deleteManySong = () => {
    SongService.removeMany(selected)
      .then((response) => {
        sendMessage(response.data.status, response.data.message);

        refreshData();
      })
      .catch((e) => {
        sendMessage('error', 'Sorry, an unexpected error occurred !!!');
      });
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
      >
        <DialogTitle id="alert-dialog-title">{language.deleteSong}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {selected.length > 0 && data.length === 0 ? (
              <span>{language.describeDelete}</span>
            ) : (
              <span>
                {language.song} "<strong>{data ? data.name : ''}</strong>"{' '}
                {language.describeDeleteDetail}
              </span>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="default">
            {language.cancel}
          </Button>
          <Button
            onClick={() => {
              selected.length > 0 && data.length === 0
                ? deleteManySong()
                : deleteSong(data.id);
              handleClose();
            }}
            color="primary"
            autoFocus
          >
            {language.delete}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
