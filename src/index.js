import {render} from "react-dom";
import React from "react";
import 'whatwg-fetch'
import AppRoot from "containers/app/AppRoot";
import store from "./configureStore";

render(
    <AppRoot store={store} />,
    document.getElementById('root')
);
