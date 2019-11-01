import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "./App.css";
import ListView from "./View/ListView";
import ItemView from "./View/ItemView";
import EditList from "./View/Edit/List";
import EditTask from "./View/Edit/Task";
import { ITaskList, IGeneralResponse } from "./interfaces";
import { LISTS } from "./models/urls";
import TaskList from "./components/List/TaskList";

const App: React.FC = () => {
    const [lists, setLists] = useState([] as Array<ITaskList>);

    useEffect(() => {
        const fetchLists = async () => {
            const res = await fetch(LISTS, {
                method: "GET"
            });
            const { message } = (await res.json()) as IGeneralResponse<Array<ITaskList>>;
            setLists(message);
        };

        fetchLists();
    }, []);

    return (
        <div className="App">
            <BrowserRouter>
                <div className="list">
                    <TaskList all={lists} />
                    <div className="task-container">
                        <Switch>
                            <Redirect from="/" to="/list/all/1" exact />
                            <Route path="/list/:lid/:page" component={ListView} />
                            <Route path="/item/:tid" component={ItemView} />
                            <Route path="/create/list" component={EditList} />
                            <Route path="/create/task" component={() => <EditTask lists={lists} />} />
                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
        </div>
    );
};

export default App;
