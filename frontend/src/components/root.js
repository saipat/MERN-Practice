import React from 'react';
import { Provider } from 'react-router';
import { HashRouter } from 'react-router-dom';

import App from './app';

const root = ({store}) =>{
    return (
        <Provider store={store}>
            <HashRouter>
                <App />
            </HashRouter>
        </Provider>
    )
};

export default root;