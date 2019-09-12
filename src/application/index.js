import React, { Component } from 'react';
import Header from './header/header';
import AllBooksRecord from './content/allBooksRecord';
import BooksRecord  from './content/booksRecord';
import Student from './content/student';
import {Route,Switch} from "react-router-dom";
import Home from './content/home';
import ReturnBook from './content/returnBook';
import BookReturnRecord from './content/bookReturnRecord';




class MainApplication extends Component {
    render() {
        return (
            <React.Fragment>
                <Header />

                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/classRecords" component={AllBooksRecord} />
                    <Route exact path="/books/:classId" component={BooksRecord} />
                    <Route exact path="/students" component={Student} />
                    <Route exact path="/returnBook" component={ReturnBook} />
                    <Route exact path="/bookReturnRecord" component={BookReturnRecord} />
                    
                </Switch>
                
            </React.Fragment>
        );
    }
}

export default MainApplication;