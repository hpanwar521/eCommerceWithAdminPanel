import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import Spinner from '../layout/Spinner';

const PrivateRoute = ({component:Component,  auth: { isAuthenticated, loading }, ...rest})=>{ 
    return(
<Route {...rest} render={props=>loading? (<Spinner/> ): isAuthenticated? (<Component/>): (<Redirect to='/login'/>)}/>
)
    
}

const mapStateToProps = state =>({auth: state.auth})

export default connect(mapStateToProps)(PrivateRoute);