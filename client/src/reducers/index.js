import { combineReducers } from 'redux';
import userReducer from './user-reducer';
import modalReducer from './modal-reducer';
import {BATCH_ACTIONS} from "../actions";

export function enableBatching(reduce) {
	return function batchingReducer(state, action) {
		switch (action.type) {
			case BATCH_ACTIONS:
				return action.payload.reduce(batchingReducer, state);
			default:
				return reduce(state, action);
		}
	}
}

const rootReducer = combineReducers({
    user: userReducer,
		modal:modalReducer
});

export default rootReducer;
