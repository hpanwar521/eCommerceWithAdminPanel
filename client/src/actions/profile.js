import {GET_PROFILE,PROFILE_ERROR,CLEAR_PROFILE,ACCOUNT_DELETED} from './types';
import { setAlert } from './alert'; 
import axios from 'axios';





// get current user profile 
export const getCurrentProfile =()=> async dispatch =>{
    
    try {
        const res = await axios.get('/api/profile/me');
        dispatch({
            type:GET_PROFILE,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.response.statusText, status :error.response.status}
        })
    }
}


// delete user account and  profile 
export const deleteAccount =()=> async dispatch =>{
    if (window.confirm('Are you sure you want to delete your profile?')){
        try {
            await axios.delete('/api/profile');
            dispatch({ type: CLEAR_PROFILE });
            dispatch({ type: ACCOUNT_DELETED });
            dispatch(setAlert('Your account has been permanently deleted'));
        } catch (error) {
            dispatch({
                type: PROFILE_ERROR,
                payload: {msg: error.response.statusText, status :error.response.status}
            })
        }
    }
    
}




