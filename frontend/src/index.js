import React from 'react';
import ReactDom from 'react-dom';

import Root from './components/root';
import configureStore from './store/store';
//use this to parse the user's session token
import jwt_decode from 'jwt-decode';
import { setAuthToken } from './util/session_api_util';
import { logout } from './actions/session_actions';

document.addEventListener('DOMContentLoaded', () => {
    let store;

    // If a returning user has a session token stored in localStorage
        // Set the token as a common header for all axios requests
        // Decode the token to obtain the user's information
        // Create a preconfigured state we can immediately add to our store
        // If the user's token has expired
             // Logout the user and redirect to the login page
    //else If this is a first time user, start with an empty store
    // Render our root component and pass in the store as a prop

    if (localStorage.jwtToken) {
        setAuthToken(localStorage.jwtToken);
        
        const decodeUser = jwt_decode(localStorage.jwtToken);
        
        const preloadedState = {session: {isAuthenticated: true, user: decodeUser} };
        store = configureStore(preloadedState);

        const currentTime = Date.now();

        if(decodeUser.exp < currentTime){
            store.dispatch(logout);
            window.location.href = '/login';
        }
    }else {
        store = configureStore({});
    }

    const root = document.getElementById('root');
    ReactDom.render(
        <Root store={store} />, root
    );

});