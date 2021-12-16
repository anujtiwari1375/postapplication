import React from "react";
import Home from "./Home";
import SinglePost from "./components/SinglePost";
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import reducers from './reducers/';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
const store = createStoreWithMiddleware(reducers);


class Wrapper extends React.Component {
    render() {
        var props = this.props;
        return (
            <Provider store={store} >
                <div className="main">
                    <Router>
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/single-post/:id" component={SinglePost} />)
                        </Switch>
                    </Router>
                </div>
            </Provider>
        );
    }
}

export default Wrapper;