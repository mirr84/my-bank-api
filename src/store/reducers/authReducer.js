import {ACTION_SETTER} from "../actions/actionConst";
import {getStorage} from "../utils/getStorage";

const initState = {
    token: ''
}

export const authReducer = (state = getStorage().getInitStorage('authReducer', initState), action) => {

    let newState = Object.assign({}, state);

    if (action.reducer === 'authReducer') {
        if (action.type === ACTION_SETTER) {
            newState = Object.assign(newState, action.payload);
        }
    }

    return newState;

}