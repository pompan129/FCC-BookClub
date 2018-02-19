import {SET_AUTHENTICATION,
  SET_USERNAME,
  SET_USER,
  DELETE_USER,
  UPDATE_USER_LIBRARY,
  SET_AUTH_ERROR,
  LOGIN_USER_JWT} from "../actions";

export default function (state={authenticated:false,username:""}, action) {
    switch (action.type) {
        case SET_AUTHENTICATION:
          return {...state,authenticated:action.payload};
        case SET_AUTH_ERROR:
          return { ...state, error: action.payload };
        case SET_USERNAME:
          return {...state,username:action.payload};
        case UPDATE_USER_LIBRARY:
          return {...state,book_ids:action.payload};
        case SET_USER:
          return {...state,...action.payload};
        case DELETE_USER:
          return {};
        case LOGIN_USER_JWT:
          return {...state,username:action.payload,authenticated:true};
        default:
          return state;

    }
}
