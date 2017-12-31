//import Request from 'request';
import Axios from "axios";

export const BATCH_ACTIONS = "BATCH_ACTIONS";
export const SET_AUTHENTICATION = "SET_AUTHENTICATION";
export const SET_USERNAME = "SET_USERNAME";
export const SET_AUTH_ERROR = "SET_AUTH_ERROR";
export const AUTH_JWT = "AUTH_JWT";
export const LOGIN_USER_JWT = "LOGIN_USER_JWT";
export const LOG_OUT = "LOG_OUT";//todo needed?
export const SET_ERROR_MESSAGE = "SET_ERROR_MESSAGE";
export const FETCHING_START = "FETCHING_START";
export const FETCHING_DONE = "FETCHING_DONE";
export const SET_BOOKS = "SET_BOOKS";
export const SET_BOOKS_ERROR = "SET_BOOKS_ERROR";
export const SET_HEADER_MESSAGE = "SET_HEADER_MESSAGE";
export const RENDER_MODAL="RENDER_MODAL";
export const TEST="TEST";



//action to complete multiple actions with only one call to dispatch/render
export const  batchActions = (actions)=>{
   return {
      type: BATCH_ACTIONS,
      payload: actions
   }
}

export const setAuthentication = (auth)=>{
  return {
      type: SET_AUTHENTICATION,
      payload: auth
   }
}

export const setAuthenticationError = (error)=>{
  return {
      type: SET_AUTH_ERROR,
      payload: error
   }
}

export const renderModal = (visible, modal_type)=>{
  console.log('renderModal', visible, modal_type);//todo
  return {
      type: RENDER_MODAL,
      payload: {modal_type,visible}
   }
}

//message actions
export const setHeaderMessage = (message)=>{
  return {
      type: SET_HEADER_MESSAGE,
      payload: message
   }
}

//user actions----------------------
export const setUsername = (name)=>{
  return {
      type: SET_USERNAME,
      payload: name
    }
}

//login user --a thunk
export const signin = (username,password,successCallback)=>{
  console.log('action:signin(1)');//todo
  return (dispatch,getstate)=>{
    Axios.post('/api/user/signin',{username,password})
      .then((resp)=>{
        console.log('action:signin',resp);//todo
        const batch = [];
        batch.push(setAuthentication(true));
        batch.push(setUsername(username));//todo
        batch.push(renderModal(false,''));
        localStorage.setItem('jwt', resp.data.token);//JWT in localstorage for protected routes
        dispatch(batchActions(batch));
        successCallback();
      })
      .catch((err)=>{
        console.log("signin", err.response.data.error);//todo
        dispatch(setAuthenticationError(err.response.data.error));
      })
  }
}

//signup user --a thunk
export const signup = (username,password,email,successCallback)=>{
  return (dispatch,getstate)=>{
    console.log('action:signup');//todo
    Axios.post('/api/user/signup',{username,password,email})
      .then((resp)=>{
        console.log("signup",resp);
        successCallback();
        const batch = [];
        batch.push(setAuthentication(true));
        batch.push(setUsername(username));//todo
        batch.push(renderModal(false,''));
        localStorage.setItem('jwt', resp.data.token);//JWT in localstorage for protected routes
        dispatch(batchActions(batch));
      })
      .catch((err)=>{
        console.log("signup", err.response.data.error);//todo
        dispatch(setAuthenticationError(err.response.data.error));
      })
  }
}

//log user out
export const logout=()=>{
  console.log('action:logout');//todo
  const batch = [];
  batch.push(setAuthentication(false));
  batch.push(setUsername(""));
  localStorage.setItem('jwt','');//JWT in localstorage for protected routes
  return batchActions(batch);
}


//book actions----------------------

export const setBooks=(books)=>{
  console.log('setBooks', books);//todo
  return {
      type: SET_BOOKS,
      payload: books
   }
}

export const  setBooksError=(error)=>{
  console.log('setBooksError', error);//todo
  return {
      type: SET_BOOKS_ERROR,
      payload: error
   }
}

//a thunk
export const fetchBooks = ()=>{
  return (dispatch, getState) => {
      Axios.get('/api/booklist/list')
        .then((resp)=>{
            console.log("fetchBooks", resp.data);//todo
            dispatch(setBooks(resp.data))
        })
        .catch((err)=>{
          console.log("fetchBooks", err.response.data.error);//todo
          dispatch(setBooksError(err.response.data.error));
        })
  }

}
