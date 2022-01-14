import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { lighten, makeStyles } from '@material-ui/core/styles';
import { Toolbar, Typography, Tooltip, IconButton } from '@material-ui/core';
import { Delete, FilterList } from '@material-ui/icons';

import LanguageContext from '../../contexts/LanguageContext';

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));

const TableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected, handleOpenModalDel } = props;
  const { language } = useContext(LanguageContext);

  return (
    <Toolbar
      style={{ backgroundColor: '#c5cae9' }}
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} {language.selected}
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {language.listSongs}
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete" onClick={handleOpenModalDel}>
            <Delete style={{ color: '#f50057' }} />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterList />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

TableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default TableToolbar;
