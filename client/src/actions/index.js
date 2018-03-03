//import Request from 'request';
import Axios from "axios";

export const BATCH_ACTIONS = "BATCH_ACTIONS";
export const SET_AUTHENTICATION = "SET_AUTHENTICATION";
export const SET_USERNAME = "SET_USERNAME";
export const SET_USER = "SET_USER";
export const DELETE_USER = "DELETE_USER";
export const UPDATE_USER_LIBRARY = "UPDATE_USER_LIBRARY";
export const SET_AUTH_ERROR = "SET_AUTH_ERROR";
export const AUTH_JWT = "AUTH_JWT";
export const LOGIN_USER_JWT = "LOGIN_USER_JWT";
export const LOG_OUT = "LOG_OUT"; //todo needed?
export const SET_ERROR_MESSAGE = "SET_ERROR_MESSAGE";
export const FETCHING_START = "FETCHING_START";
export const FETCHING_DONE = "FETCHING_DONE";
export const SEARCH_BOOKS = "SEARCH_BOOKS";
export const ADD_BOOK_LOCAL = "ADD_BOOK_LOCAL";
export const SET_BOOKS = "SET_BOOKS";
export const SET_SEARCH_RESULT = "SET_SEARCH_RESULT";
export const SET_BOOKS_ERROR = "SET_BOOKS_ERROR";
export const SET_HEADER_MESSAGE = "SET_HEADER_MESSAGE";
export const RENDER_MODAL = "RENDER_MODAL";
export const TEST = "TEST";

//action to complete multiple actions with only one call to dispatch/render
//thunks do not work!!!!
export const batchActions = actions => {
  return {
    type: BATCH_ACTIONS,
    payload: actions
  };
};

//Auth Actions-------------------------------------------

//check JWT authentication on page refresh --a thunk
export const authRefreshJWT = token => {
  //console.log("authRefreshJWT:   ",token);//todo
  return (dispatch, getState) => {
    if (!token) {
      dispatch(batchActions([setUsername(""), setAuthentication(false)]));
    }

    //start spinner
    dispatch(fecthStart());

    //verify token w API
    Axios.get("/api/user/auth/refresh/jwt", {
      params: { token },
      headers: { Authorization: "Bearer " + token }
    })
      .then(resp => {
        //console.log("authRefreshJWT,success>   ",resp.data);//todo
        dispatch(
          batchActions([
            setUser(resp.data.user),
            setAuthentication(true),
            renderModal(false),
            fecthDone()
          ])
        );
        localStorage.setItem("jwt", token);
      })
      .catch(function(error) {
        console.log("authRefreshJWT,error>   ", error); //todo
        dispatch(
          batchActions([
            setUsername(""),
            setAuthentication(false),
            setAuthenticationError(error.message),
            fecthDone()
          ])
        );
      });
  };
};

export const setAuthentication = auth => {
  return {
    type: SET_AUTHENTICATION,
    payload: auth
  };
};

export const setAuthenticationError = error => {
  return {
    type: SET_AUTH_ERROR,
    payload: error
  };
};

//message actions------------------------------------------
export const setHeaderMessage = message => {
  return {
    type: SET_HEADER_MESSAGE,
    payload: message
  };
};

export const fecthStart = () => {
  //console.log("FETCHING_START");//todo
  return { type: FETCHING_START };
};

export const fecthDone = () => {
  //console.log("FETCHING_DONE");//todo
  return { type: FETCHING_DONE };
};

export const renderModal = (visible, modal_type) => {
  //console.log('renderModal', visible, modal_type);//todo
  return {
    type: RENDER_MODAL,
    payload: { modal_type, visible }
  };
};

//user actions----------------------------------------------
export const setUsername = name => {
  //todo needed?
  return {
    type: SET_USERNAME,
    payload: name
  };
};

export const setUser = user => {
  return {
    type: SET_USER,
    payload: user
  };
};

export const deleteUser = () => {
  return {
    type: DELETE_USER
  };
};

//login user --a thunk
export const signin = (username, password, successCallback) => {
  return (dispatch, getstate) => {
    dispatch(fecthStart()); //start spinner

    Axios.post("/api/user/signin", { username, password })
      .then(resp => {
        console.log("action:signin", resp); //todo
        const { user } = resp.data;

        const batch = [];
        batch.push(setAuthentication(true));
        batch.push(setUser(user)); //todo
        batch.push(renderModal(false, ""));
        batch.push(fecthDone());
        localStorage.setItem("jwt", resp.data.token); //JWT in localstorage for protected routes
        dispatch(batchActions(batch));
        successCallback();
      })
      .catch(err => {
        console.log("signin", err.response.statusText); //todo
        dispatch(
          batchActions([
            setAuthenticationError(err.response.statusText),
            fecthDone()
          ])
        );
      });
  };
};

//signup user --a thunk
export const signup = (username, password, email, successCallback) => {
  return (dispatch, getstate) => {
    dispatch(fecthStart()); //start spinner

    Axios.post("/api/user/signup", { username, password, email })
      .then(resp => {
        console.log("signup", resp);
        successCallback();
        const batch = [];
        batch.push(setAuthentication(true));
        batch.push(setAuthenticationError(""));
        batch.push(setUsername(username)); //todo
        batch.push(renderModal(false, ""));
        batch.push(fecthDone());
        localStorage.setItem("jwt", resp.data.token); //JWT in localstorage for protected routes
        dispatch(batchActions(batch));
      })
      .catch(err => {
        console.log("signup", err.response.data.error); //todo
        const batch = [];
        batch.push(setAuthenticationError(err.response.data.error));
        batch.push(fecthDone());
        batch.push(renderModal(true, "signup"));
        dispatch(batchActions(batch));
      });
  };
};

//log user out
export const logout = history => {
  console.log("action:logout"); //todo
  const batch = [];
  batch.push(setAuthentication(false));
  batch.push(deleteUser());
  localStorage.setItem("jwt", ""); //JWT in localstorage for protected routes
  history.push("/");
  return batchActions(batch);
};

//thunk
export const editUser = (
  username,
  email,
  street,
  city,
  zip,
  state,
  successCallback
) => {
  return (dispatch, getstate) => {
    dispatch(fecthStart()); //start spinner
    const address = { street, city, zip, state };
    const token = localStorage.getItem("jwt");
    Axios({
      method: "post",
      url: "/api/user/update",
      data: { username, address, email },
      headers: { Authorization: "Bearer " + token }
    })
      .then(resp => {
        console.log("editUser", resp);
        const batch = [];
        batch.push(setUser(resp.data.user)); //todo
        batch.push(renderModal(false, ""));
        batch.push(fecthDone());
        dispatch(batchActions(batch));
      })
      .catch(err => {
        console.log("editUser", err); //todo
        dispatch(setAuthenticationError("unable to update user"));
      });
  };
};

//book actions------------------------------------------------

export const setBooks = books => {
  //console.log('setBooks', books);//todo
  return {
    type: SET_BOOKS,
    payload: books
  };
};

export const setBooksError = error => {
  console.log("setBooksError", error); //todo
  return {
    type: SET_BOOKS_ERROR,
    payload: error
  };
};

//get all books from DB --a thunk
export const fetchBooks = () => {
  return (dispatch, getState) => {
    dispatch(fecthStart()); //start spinner

    Axios.get("/api/booklist/list")
      .then(resp => {
        console.log("fetchBooks-then", resp.data); //todo
        dispatch(batchActions([setBooks(resp.data), fecthDone()]));
      })
      .catch(err => {
        console.log("fetchBooks", err.response); //todo
        dispatch(batchActions([setBooksError(err.response), fecthDone()]));
      });
  };
};

//set google books search result in redux store
export const setSearchResult = books => {
  console.log("setSearchResult", books); //todo
  return {
    type: SET_SEARCH_RESULT,
    payload: books
  };
};

//look for book title on Google books
export const searchBooks = query => {
  console.log("searchBooks: ", query); //todo
  return (dispatch, getState) => {
    dispatch(fecthStart()); //start spinner

    Axios.get("/api/search/books", { params: { q: query } })
      .then(resp => {
        console.log("searchBooks", resp.data); //todo
        dispatch(batchActions([setSearchResult(resp.data), fecthDone()]));
      })
      .catch(err => {
        console.log("searchBooks", err.response.data.error); //todo
        dispatch(
          batchActions([setBooksError(err.response.data.error), fecthDone()])
        );
      });
  };
};

//a thunk - send users request to borrow book to DB
export const requestTrade = (bookid, username) => {
  console.log("requestTrade(1)", bookid, username); //todo

  return (dispatch, getState) => {
    dispatch(fecthStart()); //start spinner
    Axios.post("/api/booklist/update/status", {
      id: bookid,
      rq_status: { rq_state: "requested", rq_by: username }
    })
      .then(resp => {
        console.log("requestTrade:SUCCESS", resp); //todo  test
        dispatch(fetchBooks());
        dispatch(fecthDone());
      })
      .catch(err => {
        console.log("requestTrade:ERROR", err.response.data.error); //todo
        dispatch(
          batchActions([
            setAuthenticationError(err.response.data.error),
            fecthDone()
          ])
        );
      });
  };
};

//thunk
export const approveTrade = (book, approved, username) => {
  console.log("approveOrRejectTrade", book, username, approved); //todo

  return (dispatch, getState) => {
    const rq_status = approved
      ? { ...book.rq_status, rq_state: "traded" }
      : { rq_state: "available" };

    dispatch(fecthStart()); //start spinner

    Axios.post("/api/booklist/update/status", { id: book._id, rq_status })
      .then(resp => {
        console.log("approveTrade:SUCCESS", resp); //todo  test
        dispatch(fetchBooks());
        dispatch(fecthDone());
      })
      .catch(err => {
        console.log("approveTrade:ERROR", err.response.data.error); //todo
        dispatch(
          batchActions([
            setAuthenticationError(err.response.data.error),
            fecthDone()
          ])
        );
      });
  };
};

export const returnBook = book => {
  console.log("returnBook", book); //todo

  return (dispatch, getState) => {
    const rq_status = { rq_state: "available" };

    dispatch(fecthStart()); //start spinner

    Axios.post("/api/booklist/update/status", { id: book._id, rq_status })
      .then(resp => {
        console.log("returnBook:SUCCESS", resp); //todo  test
        dispatch(fetchBooks());
        dispatch(fecthDone());
      })
      .catch(err => {
        console.log("returnBook:ERROR", err.response.data.error); //todo
        dispatch(
          batchActions([
            setAuthenticationError(err.response.data.error),
            fecthDone()
          ])
        );
      });
  };
};

//add book to DB for user
export const addBook = (book, username) => {
  return (dispatch, getState) => {
    Axios.post("/api/booklist/addremove", { ...book, owner: username })
      .then(resp => {
        console.log("addBook,Success:", resp); //todo
        dispatch(addBookLocal(resp.data.book));
      })
      .catch(err => {
        console.log("addBook", err.response.data.error); //todo
        dispatch(setAuthenticationError(err.response.data.error));
      });
  };
};

export const removeBookFromWishlist = bookid => {
  return (dispatch, getState) => {
    dispatch(fecthStart()); //start spinner
    Axios.post("/api/booklist/update/status", {
      id: bookid,
      rq_status: { rq_state: "available" }
    })
      .then(resp => {
        console.log("removeBookFromWishlist:SUCCESS", resp); //todo  test
        dispatch(fetchBooks());
        dispatch(fecthDone());
      })
      .catch(err => {
        console.log("requestTrade:ERROR", err.response.data.error); //todo
        dispatch(
          batchActions([
            setAuthenticationError(err.response.data.error),
            fecthDone()
          ])
        );
      });
  };
};

//add book to local store
export const addBookLocal = book => {
  return {
    type: ADD_BOOK_LOCAL,
    payload: book
  };
};

export const removeBook = (bookid, username) => {
  ///todo change
  console.log("removeBookFromUserLibraryAndDB", bookid); //todo
  return (dispatch, getState) => {
    dispatch(fecthStart()); //start spinner
    Axios.delete("/api/booklist/addremove", { data: { id: bookid, username } })
      .then(resp => {
        console.log("removeBookFromUserLibraryAndDB:SUCCESS", resp); //todo  test
        dispatch(fetchBooks());
        dispatch(fecthDone());
      })
      .catch(err => {
        console.log("removeBookFromUserLibraryAndDB:ERROR", err); //todo
        dispatch(
          batchActions([
            setAuthenticationError(err.response.data.error),
            fecthDone()
          ])
        );
      });
  };
};
