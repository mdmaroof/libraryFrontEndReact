import React, { Component } from 'react';
import Header from './header/header';
import AllBooksRecord from './content/allBooksRecord';
import BooksRecord  from './content/booksRecord';
import {Route,Switch} from "react-router-dom";
import Home from './content/home';



class MainApplication extends Component {
    render() {
        return (
            <React.Fragment>
                <Header />

                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/classRecords" component={AllBooksRecord} />
                    <Route exact path="/books/:classId" component={BooksRecord} />
                </Switch>
                
            </React.Fragment>
        );
    }
}

export default MainApplication;