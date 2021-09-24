import React,{Fragment} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {logout} from '../../actions/auth'

const Navbar = ({ auth:{ isAuthenticated, loading, user }, logout }) => {
  const authLinks=(<ul>
    <li><Link  to="/dashboard"><i className="fas fa-user" /> {' '}<span className='hide-sm'>Dashboard</span></Link></li>
  {user && user.admin && <li><Link  to="/admin-panel"><i class="fas fa-tools"></i> {' '}<span className='hide-sm'>Admin panel</span></Link></li>}
    
  <li><Link onClick={logout} to="#!"><i className="fas fa-sign-out-alt"></i>{' '}<span className='hide-sm'>LogOut</span></Link></li>
  </ul>
  )
  // const adminLinks=(
  //   <ul>
  //     <li><Link  to="/dashboard"><i className="fas fa-user" /> {' '}<span className='hide-sm'>Dashboard</span></Link></li>
  //     <li><Link  to="/admin-panel"><i className="fas fa-sign-out-alt"></i>{' '}<span className='hide-sm'>Admin Panel</span></Link></li>
  //     <li><Link onClick={logout} to="#!"><i className="fas fa-sign-out-alt"></i>{' '}<span className='hide-sm'>LogOut</span></Link></li>
  //   </ul>
  //   )
  
  const guestLinks=(
  <ul>
    <li><Link  to="#!">Developers</Link></li>
    <li><Link to="/register">Register</Link></li>
    <li><Link to="/login">Login</Link></li>
  </ul>
  )


    return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/"><i class="fas fa-store"></i> Himanshi's Shop</Link>
      </h1>
    {!loading && (<Fragment>{isAuthenticated ? authLinks:guestLinks}</Fragment>)}
    {/* {!loading && (<Fragment>{isAuthenticated && user.admin ? adminLinks:guestLinks}</Fragment>)} */}
    </nav>
    )
}

Navbar.propTypes={
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
 auth: state.auth
})

export default connect(mapStateToProps,{logout})(Navbar);

