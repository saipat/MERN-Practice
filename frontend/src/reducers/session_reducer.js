import { RECIEVE_USER_LOGOUT } from '../actions/session_actions';

const initialState = {
    isAthenticated: false,
    user: {}
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState, action){
    switch(action.type){
        case RECIEVE_USER_LOGOUT:
            return {
             isAuthenticated: false,
             user: undefined
            };
        default: 
            return state;
    }
}