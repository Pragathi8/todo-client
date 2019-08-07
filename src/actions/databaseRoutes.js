let domain = 'https://limitless-brushlands-35057.herokuapp.com';

if(window.location.hostname === 'localhost') domain = 'http://localhost:5000';

export const GET_TODOS_URL = domain + '/getTodos';
export const ADD_TODO_URL = domain;
export const DELETE_TODO_URL = domain;
export const TOGGLE_TODO_URL = domain;

export const CHANGE_VISIBILITY_FILTER_URL = '';

export const LOGIN_USER_URL = domain + '/login';
export const LOGOUT_USER_URL = domain + '/logout';
export const REGISTER_USER_URL = domain + '/register';