import React, {PureComponent} from "react";
import "scss/Main.scss";
import "./App.scss";
import AppNavigation from "containers/app/AppNavigation";
import AppContent from "./AppContent";
import AppFooter from "./AppFooter";

import AppRoutes from "containers/routes/AppRoutes";

export default class App extends PureComponent {
    render () {
        return (
            <div className="App">
                <AppNavigation />
                <AppContent>
                    <AppRoutes />
                </AppContent>
                <AppFooter />
            </div>
        )
    }
}
