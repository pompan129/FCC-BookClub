import {RENDER_MODAL} from "../actions";


export default function (state={}, action) {
    switch (action.type) {
        case RENDER_MODAL:
          return {...state,modal_type:action.payload.modal_type,visible:action.payload.visible};
        default:
          return state;
    }
}
