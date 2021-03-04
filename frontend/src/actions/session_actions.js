import  * as APIUtil from '../util/session_api_util';
import jwt_decode from 'jwt-decode';

export const RECIEVE_USER_LOGOUT = 'RECIEVE_USER_LOGOUT';

export const logoutUser = () => ({
    type: RECIEVE_USER_LOGOUT
});

// Remove the token from local storage.
// Remove the token from the common axios header.
// Dispatch a logout action.
export const logout = ()  => dispatch => {
    localStorage.removeItem('jwtToken');
    APIUtil.setAuthToken(false);
    dispatch(logoutUser());
}