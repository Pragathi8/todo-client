import store from './store';
import {LOGIN_USER} from './actions/types';

let id = localStorage.getItem('userId');
if(id){
    store.dispatch({
        type: LOGIN_USER,
        payload: {
            emailId: id
        }
    })
}
