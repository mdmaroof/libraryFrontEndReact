import React from 'react';
import './App.css';
import { BrowserRouter as Router } from "react-router-dom";
import MainApplication from './application';
import {Provider} from 'mobx-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// stores

import ClassesStore from './stores/classesStore';

toast.configure({
  autoClose: 4000,
  draggable: false,
  hideProgressBar:true,
  closeOnClick:false,
  pauseOnHover:false,
});


function App() {
  return (
    <Router>
      <Provider classesStore={ClassesStore}>
        <MainApplication />
      </Provider>
    </Router>
  );
}

export default App;
