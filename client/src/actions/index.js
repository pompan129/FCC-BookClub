export const BATCH_ACTIONS = "BATCH_ACTIONS";
export const SET_AUTHENTICATION = "SET_AUTHENTICATION";
export const SET_USERNAME = "SET_USERNAME";
export const LOG_OUT = "LOG_OUT";
export const SET_ERROR_MESSAGE = "SET_ERROR_MESSAGE";
export const FETCHING_START = "FETCHING_STSART";
export const FETCHING_DONE = "FETCHING_DONE";
export const SET_AUTH_ERROR = "SET_AUTH_ERROR";
export const AUTH_JWT = "AUTH_JWT";
export const LOGIN_USER_JWT = "LOGIN_USER_JWT"
export const RENDER_MODAL="RENDER_MODAL"



export const renderModal = (visible, modal_type)=>{
  console.log('renderModal', visible, modal_type);//todo
  return {
      type: RENDER_MODAL,
      payload: {modal_type,visible}
   }
}

export const closeModal = (visible, type)=>{

}
