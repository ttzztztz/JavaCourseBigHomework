import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "./App.css";
import ListView from "./View/ListView";

const App: React.FC = () => {
    return (
        <div className="App">
            <BrowserRouter>
                <Switch>
                    <Redirect from="/" to="/list/all" exact />
                    <Route path="/list/:lid" component={ListView} />
                </Switch>
            </BrowserRouter>
        </div>
    );
};

export default App;
