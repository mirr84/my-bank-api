import {actionSetter} from "./actions/actions";

export const dispatchs = (dispatch) =>
    (
        {
            dispatch:
                {
                    setter: (reducer, v) => dispatch(actionSetter(reducer, v)),
                }
        }
    )