import React, { useContext } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { green, blueGrey } from '@material-ui/core/colors';
import { Checkbox, IconButton, Tooltip } from '@material-ui/core';
import { PlayArrow, Edit } from '@material-ui/icons';

import StyledTableCell from '../../TableCustoms/StyledTableCell';
import StyledTableRow from '../../TableCustoms/StyledTableRow';

import LanguageContext from '../../../contexts/LanguageContext';

export default function Item(props) {
  const {
    row,
    labelId,
    isItemSelected,
    handleClick,
    handleOpenModalDetail,
    handleOpenEditForm,
  } = props;
  const classes = useStyles();

  const { language } = useContext(LanguageContext);

  return (
    <StyledTableRow
      hover
      role="checkbox"
      aria-checked={isItemSelected}
      tabIndex={-1}
      key={row.id}
      selected={isItemSelected}
      //onClick={(e) => handleClick(e, row.id)}
    >
      <StyledTableCell padding="checkbox">
        <Checkbox
          onChange={(event) => handleClick(event, row.id)}
          checked={isItemSelected}
          inputProps={{ 'aria-labelledby': labelId }}
        />
      </StyledTableCell>
      <StyledTableCell component="th" id={labelId} scope="row" padding="none">
        {row.name}
      </StyledTableCell>
      <StyledTableCell align="left">{row.genre}</StyledTableCell>
      <StyledTableCell align="left">
        <div className={classes.actions}>
          <Tooltip title={language.play}>
            <IconButton
              aria-label="play"
              className={classes.playIcon}
              onClick={() => {
                handleOpenModalDetail(row);
              }}
            >
              <PlayArrow style={{ color: green[500] }} fontSize="large" />
            </IconButton>
          </Tooltip>
          <Tooltip title={language.edit}>
            <IconButton
              aria-label="edit"
              onClick={() => {
                handleOpenEditForm(row);
              }}
            >
              <Edit style={{ color: blueGrey[500] }} fontSize="inherit" />
            </IconButton>
          </Tooltip>
        </div>
      </StyledTableCell>
    </StyledTableRow>
  );
}

const useStyles = makeStyles((theme) => ({
  actions: {
    display: 'flex',
    alignItems: 'center',
  },
  playIcon: {
    padding: 7,
    marginRight: 20,
    marginLeft: 20,
  },
}));
