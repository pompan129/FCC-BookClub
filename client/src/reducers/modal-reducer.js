import {RENDER_MODAL} from "../actions";


export default function (state={modal_type:'',visible:false}, action) {
  //console.log("modalReducer", action);//todo
    switch (action.type) {
        case RENDER_MODAL:
          return {...state,modal_type:action.payload.modal_type,visible:action.payload.visible};
        default:
          return state;
    }
}
