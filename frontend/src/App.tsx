import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "./App.css";
import ListView from "./View/ListView";
import ItemView from "./View/ItemView";

const App: React.FC = () => {
    return (
        <div className="App">
            <BrowserRouter>
                <Switch>
                    <Redirect from="/" to="/list/all/1" exact />
                    <Route path="/list/:lid/:page" component={ListView} />
                    <Route path="/item/:tid" component={ItemView} />
                </Switch>
            </BrowserRouter>
        </div>
    );
};

export default App;
