import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Alert from '../layout/Alert';
import PrivateRoute from './PrivateRoute';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Dashboard from '../dashboard/Dashboard';
import Adminpanel from '../adminComponents/Adminpanel';

const Routes =()=>{
    return (
        <section className='container'>
            <Alert/>
            <Switch>
                <Route exact path='/register' component={Register}/>
                <Route exact path='/login' component={Login}/>

                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <PrivateRoute exact path="/admin-panel" component={Adminpanel} />
            </Switch>
        </section>
    )
}

export default Routes;
