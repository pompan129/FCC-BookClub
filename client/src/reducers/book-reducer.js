import {SET_BOOKS,SET_BOOKS_ERROR} from "../actions";

export default function (state={}, action) {
    switch (action.type) {
        case SET_BOOKS:
          return {...state,books:action.payload};
        case SET_BOOKS_ERROR:
          return {...state,error:action.payload};
        default:
          return state;
    }
}
