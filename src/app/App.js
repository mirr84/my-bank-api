import React, {useState} from 'react';

import {Route, Switch} from 'react-router-dom';

import {connector} from "../store/utils/simpleConnector";
import Home from "./Home";

const methods = {
    componentWillMount(props) {
        console.log('init App', props);
    }
}

const Page404 = () => <div>Page404</div>

const App = ({history, match, dispatch}) => {

    // const [show, setShow] = useState(true);
    // const handleClose = () => setShow(false);

    return <div>
        <Switch>
            <Route exact path={"/"} children={<Home/>}/>
            <Route component={Page404}/>
        </Switch>
    </div>
}

export default connector({methods, component: App});
