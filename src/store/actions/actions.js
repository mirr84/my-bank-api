import {ACTION_SETTER} from "./actionConst";

export const actionSetter = (reducer, payload) => (
    {
        type: ACTION_SETTER,
        reducer,
        payload
    }
)