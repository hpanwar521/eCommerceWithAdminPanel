import React from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import './adminpanel.css'

const Adminpanel = () => {
    return (
        <>
        
            <nav className="main-menu" style={{marginTop:'60px'}}>


            
     
           
                <div className="scrollbar" id="style-1">
                
                    <ul>
                    
                        <li><Link to="http://startific.com"><i className="fa fa-home fa-lg"></i><span className="nav-text"></span></Link></li>   
                    
                        <li><Link to="http://startific.com"><i className="fa fa-user fa-lg"></i><span className="nav-text">Login</span></Link></li>   

                        <li><Link to="http://startific.com"><i className="fa fa-envelope-o fa-lg"></i><span className="nav-text">Contact</span></Link></li>   
                 
                    
                        <li className="darkerlishadow"><Link to="http://startific.com"><i className="fa fa-clock-o fa-lg"></i><span className="nav-text">News</span></Link></li>
                        
                        <li className="darkerli"><Link to="http://startific.com"><i className="fa fa-desktop fa-lg"></i><span className="nav-text">Technology</span></Link></li>
                        
                        <li className="darkerli"><Link to="http://startific.com"><i className="fa fa-plane fa-lg"></i><span className="nav-text">Travel</span></Link></li>
                        
                        <li className="darkerli"><Link to="http://startific.com"><i className="fa fa-shopping-cart"></i><span className="nav-text">Shopping</span></Link></li>
                        
                        <li className="darkerli"><Link to="http://startific.com"><i className="fa fa-microphone fa-lg"></i><span className="nav-text">Film &amp; Music</span></Link></li>

                        <li className="darkerli"><Link to="http://startific.com"><i className="fa fa-flask fa-lg"></i><span className="nav-text">Web Tools</span></Link></li>
                        
                        <li className="darkerli"><Link to="http://startific.com"><i className="fa fa-picture-o fa-lg"></i><span className="nav-text">Art &amp; Design</span></Link></li>

                        <li className="darkerli"><Link to="http://startific.com"><i className="fa fa-align-left fa-lg"></i><span className="nav-text">Magazines</span></Link></li>
                        
                        <li className="darkerli"><Link to="http://startific.com"><i className="fa fa-gamepad fa-lg"></i><span className="nav-text">Games</span></Link></li>
                        
                        <li className="darkerli"><Link to="http://startific.com"><i className="fa fa-glass fa-lg"></i><span className="nav-text">Life &amp; Style</span></Link></li>
                        
                        <li className="darkerlishadowdown"><Link to="http://startific.com"><i className="fa fa-rocket fa-lg"></i><span className="nav-text">Fun</span></Link></li>
                        
                    
                    </ul>

                    
                    <li><Link to="http://startific.com"><i className="fa fa-question-circle fa-lg"></i><span className="nav-text">Help</span></Link></li>   
                        
                </div>    
                   
            </nav>
          
        </>
    )
}
export default connect(null,null)(Adminpanel);

