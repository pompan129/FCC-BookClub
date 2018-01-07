import {SET_HEADER_MESSAGE,FETCHING_START,FETCHING_DONE} from "../actions";

const defaultState = {
    fetching:0
  }

export default function (state=defaultState, action) {
  //console.log("msgReducer", action,"state:",state);//todo
    switch (action.type) {
        case SET_HEADER_MESSAGE:
          return {...state,header:action.payload};
        case FETCHING_START:
          return {...state,fetching:(state.fetching +1)};
        case FETCHING_DONE:
          return {...state,fetching:(state.fetching -1)};
        default:
          return state;
    }
}
