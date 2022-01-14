import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import {
  TableHead,
  TableRow,
  TableSortLabel,
  Checkbox,
} from '@material-ui/core';

import LanguageContext from '../../contexts/LanguageContext';

import StyledTableCell from './StyledTableCell';

export default function TableHeadCustom(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;

  const { language } = useContext(LanguageContext);

  const headCells = [
    {
      id: 'name',
      numeric: false,
      disablePadding: true,
      label: language.name,
    },
    {
      id: 'genre',
      numeric: false,
      disablePadding: false,
      label: language.genre,
    },

    {
      id: 'actions',
      numeric: false,
      disablePadding: false,
      label: language.action,
    },
  ];

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <StyledTableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </StyledTableCell>
        {headCells.map((headCell) => (
          <StyledTableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={
                headCell.id === 'actions'
                  ? null
                  : createSortHandler(headCell.id)
              }
              hideSortIcon={headCell.id === 'actions' ? true : false}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </StyledTableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

TableHeadCustom.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};
