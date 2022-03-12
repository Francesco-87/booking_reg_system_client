import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter as Router} from "react-router-dom";
import {AuthProvider} from "./components/AuthProvider";
import {ProfileProvider} from "./components/ProfileProvider";


ReactDOM.render(
  <React.StrictMode>
    <Router>
        <AuthProvider>
        <ProfileProvider>
            <App/>
        </ProfileProvider>
        </AuthProvider>
    </Router>

  </React.StrictMode>,
  document.getElementById('root')
);
