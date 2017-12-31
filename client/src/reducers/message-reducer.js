import {SET_HEADER_MESSAGE} from "../actions";

const defaultState = {
  header:{
    title:"Book Borrow",
    sub:"Go ahead and borrow a book. I dare you!"
    }
  }

export default function (state=defaultState, action) {
  console.log("modalReducer", action);//todo
    switch (action.type) {
        case SET_HEADER_MESSAGE:
          return {...state,header:action.payload};
        default:
          return state;
    }
}
