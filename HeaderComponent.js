import React from 'react';
import {Component} from 'react';
import {Navbar, Jumbotron, NavbarBrand, Nav, NavItem, NavbarToggler, Collapse} from 'reactstrap';
import {NavLink} from 'react-router-dom'
class Header extends Component{
  constructor(props){
    super(props);
    this.state={
isNavOpen: false
    }

    this.toggleNav= this.toggleNav.bind(this);
  }
toggleNav(){
 this.setState({
   isNavOpen: !this.state.isNavOpen
 })
}




  render(){
    return(
    <div>
  
<Navbar dark expand="md">
  <div className='container'>
     {/* <NavbarToggler onClick={this.toggleNav}/>  */}
 <NavbarBrand className=" mr-auto" href="/"> 
 <img src='asset/images/logo.png' height="30" width="41"
 alt="Ristornate Con Fusion"/>
        </NavbarBrand> 
        {/* <Collapse Collapse isOpen={this.state.isNavOpen} navbar>  */}
       <Nav navbar className="list-unstyled">
         
       <NavItem>
           <NavLink className="nav-link " to="/home">
             <span className='fa fa-home fa-lg'></span> Home
           </NavLink>
         </NavItem>

         <NavItem>
           <NavLink className="nav-link" to="/aboutus">
             <span className='fa fa-info fa-lg'></span> About Us
           </NavLink>
         </NavItem>

         <NavItem>
           <NavLink className="nav-link" to="/menu">
             <span className='fa fa-list fa-lg'></span> Menu
           </NavLink>
         </NavItem>

         <NavItem>
           <NavLink className="nav-link" to="/contactus">
             <span className='fa fa-address-card fa-lg'></span> ContactUs
           </NavLink>
         </NavItem>
       </Nav>
        {/* </Collapse>  */}
      </div>
    </Navbar>
  
     <Jumbotron>
       <div className='container'>
         <div className='row row-header'>
           <div className='col-12 col-sm-12'>
             <h1> Ristorante Con fusion</h1>
             <p>We take inspiration from the world's beat cuisines and create a unique. Our lipsmacking creation will tickle your culinary senses.  </p>
           </div>
         </div>
       </div>
     </Jumbotron>
   
    </div>
      
            
      
    )
  }
}
export default Header;