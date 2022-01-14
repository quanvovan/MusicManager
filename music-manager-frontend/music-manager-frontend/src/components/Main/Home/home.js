import React, { useState, useEffect } from 'react';
//import './App.css';

import { Button, Grid, Container, Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import Header from './header';
import Search from '../../Common/search';
import ModalAddSong from '../../Songs/ListActions/add-song';
import ListItems from '../../Songs/ListSongs/list-songs';
import ModalDeleteSong from '../../Songs/ListActions/delete-song';
import ModalDetailSong from '../../Songs/ListActions/detail-song';
import SongService from '../../../apis/song';
import { languages } from '../../../constants/Languages';

import LanguageContext from '../../../contexts/LanguageContext';
import AuthService from '../../../apis/auth';

import Login from '../../Authentication/Login/login';
import Register from '../../Authentication/Register/register';

//Get current language from LocalStorage
let languageLocal = localStorage.getItem('language');

//Set default language if not found from local storage
if (languageLocal == null) {
  languageLocal = 'en';
  localStorage.setItem('language', 'en');
}

const home = () => {
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalDel, setOpenModalDel] = useState(false);
  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [isEditForm, setEditForm] = useState(false);

  const [data, setData] = useState([]);
  const [dataRows, setDataRows] = useState([]);
  const [valueSearch, setValueSearch] = useState('');
  const [selected, setSelected] = useState([]);

  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [openMessage, setOpenMessage] = useState(false);

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  //const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const [languageCurrent, setLanguageCurrent] = useState(languageLocal);
  const [loading, setLoading] = useState(false);

  //Get value titles by language
  const language = languageCurrent === 'en' ? languages.en : languages.vi;

  //Change language
  const switchLanguage = () => {
    const languageChange = languageCurrent === 'en' ? 'vi' : 'en';
    setLanguageCurrent(languageChange);
    localStorage.setItem('language', languageChange);
  };

  useEffect(() => {
    getAllSong();
  }, [page, pageSize, valueSearch]);

  const refreshData = () => {
    getAllSong();
  };

  //Message
  const handleOpenMessage = () => {
    setOpenMessage(true);
  };
  const handleCloseMessage = (event, reason) => {
    if (reason === 'clickaway') return;

    setOpenMessage(false);
  };

  //Modal Delete
  const handleOpenModalDel = () => {
    setOpenModalDel(true);
  };
  const handleCloseModalDel = () => {
    setOpenModalDel(false);
    setSelected([]);
    setData([]);
  };

  //Modal Add
  const handleOpenModalAdd = () => {
    setOpenModalAdd(true);
  };
  const handleCloseModalAll = () => {
    setOpenModalAdd(false);
  };

  //Modal Detail
  const handleOpenModalDetail = (data) => {
    setOpenModalDetail(true);
    setData(data);
  };
  const handleCloseModalDetail = () => {
    setOpenModalDetail(false);
    setEditForm(false);
  };

  //Handle view info song -> edit
  const handleOpenEditForm = (data) => {
    setOpenModalDetail(true);
    setEditForm(true);
    setData(data);
  };

  //Handle search
  // const handleSearch = (search) => {
  //   if (search.length <= 0) {
  //     getAllSong();
  //   } else {
  //     SongService.findByName(search)
  //       .then((res) => {
  //         setDataRows(res.data.data);
  //         setValueSearch(search);
  //       })
  //       .catch((e) => {
  //         console.log(e);
  //       });
  //   }
  // };
  const handleSearch = (e) => {
    setValueSearch(e.target.value);
    setPage(0);
  };

  const getRequestParams = (valueSearch, page, pageSize) => {
    let params = {};

    if (valueSearch) params['name'] = valueSearch;
    if (page) params['page'] = page;
    if (pageSize) params['size'] = pageSize;

    return params;
  };

  const getAllSong = () => {
    const params = getRequestParams(valueSearch, page, pageSize);
    SongService.getAll(params)
      .then((res) => {
        setDataRows(res.data.data);
        setPage(res.data.currentPage);
        //setTotalPages(res.data.totalPages);
        setTotalItems(res.data.totalItems);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const sendMessage = (status, message) => {
    setStatus(status);
    setMessage(message);
    handleOpenMessage();
  };

  useEffect(() => {
    document.title = 'Home Page';
  }, []);

  const currentUser = AuthService.getCurrentUser();

  return (
    <LanguageContext.Provider value={{ language, switchLanguage }}>
      {loading ? (
        <span>Loading...</span>
      ) : (
        <div>
          <Container fixed>
            <Header />

            <div style={{ marginBottom: 20 }}>
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
              >
                {currentUser ? (
                  <div style={{ marginLeft: 40 }}>
                    <Button
                      style={{ margin: 10 }}
                      size="large"
                      variant="contained"
                      color="primary"
                      onClick={handleOpenModalAdd}
                    >
                      {language.add}
                    </Button>

                    <Button
                      style={{ margin: 10 }}
                      size="large"
                      variant="contained"
                      color="secondary"
                      onClick={
                        selected.length > 0 ? handleOpenModalDel : () => {}
                      }
                    >
                      {language.delete}
                    </Button>
                  </div>
                ) : (
                  <div></div>
                )}

                <div style={{ marginRight: 50 }}>
                  <Search
                    valueSearch={valueSearch}
                    handleSearch={handleSearch}
                  />
                </div>
              </Grid>
            </div>

            <ListItems
              rows={dataRows}
              totalItems={totalItems}
              page={page}
              setPage={setPage}
              pageSize={pageSize}
              setPageSize={setPageSize}
              handleOpenModalDel={handleOpenModalDel}
              handleOpenModalDetail={handleOpenModalDetail}
              handleOpenEditForm={handleOpenEditForm}
              setSelected={setSelected}
              selected={selected}
            />

            <ModalAddSong
              open={openModalAdd}
              handleClose={handleCloseModalAll}
              sendMessage={sendMessage}
              refreshData={refreshData}
            />

            <ModalDeleteSong
              open={openModalDel}
              handleClose={handleCloseModalDel}
              sendMessage={sendMessage}
              refreshData={refreshData}
              data={data}
              selected={selected}
              setSelected={setSelected}
            />
            <ModalDetailSong
              open={openModalDetail}
              handleClose={handleCloseModalDetail}
              isEditForm={isEditForm}
              handleOpenModalDel={handleOpenModalDel}
              handleOpenEditForm={handleOpenEditForm}
              sendMessage={sendMessage}
              refreshData={refreshData}
              data={data}
              setData={setData}
            />

            <Snackbar
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              open={openMessage}
              autoHideDuration={6000}
              onClose={handleCloseMessage}
            >
              <Alert
                elevation={6}
                variant="filled"
                onClose={handleCloseMessage}
                severity={status.toLowerCase()}
              >
                {message}
              </Alert>
            </Snackbar>
          </Container>
        </div>
      )}
    </LanguageContext.Provider>
  );
};

export default home;
