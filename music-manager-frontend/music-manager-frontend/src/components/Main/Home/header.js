import React, { useContext, useEffect, useState } from 'react';
import {
  FormControl,
  Popper,
  Select,
  MenuItem,
  Button,
  Grow,
  MenuList,
  ClickAwayListener,
  Paper,
  Divider,
} from '@material-ui/core';

import PersonIcon from '@material-ui/icons/Person';
import LanguageContext from '../../../contexts/LanguageContext';

const Header = (props) => {
  const { language, switchLanguage } = useContext(LanguageContext);
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className="page-header">
      <h1>
        {language.title}
        <small style={{ color: '#777' }}> ReactJS</small>
      </h1>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <PersonIcon fontSize="large" style={{ marginRight: 10 }} />
        <div>
          <span>{language.hello}</span>
          <Button
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
          >
            Admin
          </Button>
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            transition
            disablePortal
            placement="bottom-start"
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === 'bottom' ? 'center top' : 'center bottom',
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      autoFocusItem={open}
                      id="menu-list-grow"
                      onKeyDown={handleListKeyDown}
                    >
                      <MenuItem onClick={handleClose}>
                        {language.profile}
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        {language.setting}
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        {language.logout}
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>

        <Divider style={{ height: 28, margin: 10 }} orientation="vertical" />

        <span>{language.language} :</span>
        <FormControl
          size="small"
          variant="outlined"
          style={{ margin: '8px', width: 120 }}
        >
          <Select
            value={language.type}
            onChange={switchLanguage}
            inputProps={{ 'aria-label': 'language' }}
          >
            <MenuItem value={'en'}>English</MenuItem>
            <MenuItem value={'vi'}>Tiếng Việt</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default Header;
