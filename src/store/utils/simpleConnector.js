import {connect} from "react-redux";
import {dispatchs} from "../dispatchs";
import lifecycle from "react-pure-lifecycle";
import {withRouter} from "react-router-dom";

export const simpleConnector = (component) => connect(state => ({state}), dispatch => dispatchs(dispatch))(component);
export const connector = ({methods, component}) => withRouter(simpleConnector(lifecycle(methods)(component)));