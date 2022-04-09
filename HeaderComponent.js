import React from 'react';
import {Component} from 'react';
import {Navbar, Jumbotron, NavbarBrand, Nav, NavItem, NavbarToggler, Collapse, Form, FormGroup, Label, Input} from 'reactstrap'
import Modal from 'react-modal/lib/components/Modal';
import { ModalHeader, ModalBody, Button } from 'reactstrap';
import {NavLink} from 'react-router-dom'
class Header extends Component{
  constructor(props){
    super(props);
    this.state={
isNavOpen: false,
modal: false
    }

    this.toggleNav= this.toggleNav.bind(this);
    this.toggleModal=this.toggleModal.bind(this);
    this.handleLogin=this.handleLogin.bind(this);
  }
toggleNav(){
 this.setState({
   isNavOpen: !this.state.isNavOpen
 })
}
toggleModal(){
this.setState({
  modal: !this.state.modal
})
}

handleLogin(event){
  this.toggleModal();
    alert("Username:" + this.username.value+ "password:" + this.password.value+ "Remember"+ this.remember.checked);
  event.preventDefault();

  }




  render(){
    return(
    <div>
<Navbar dark expand="md">
  <div className='container'>
      <NavbarToggler onClick={this.toggleNav}/>  
 <NavbarBrand className=" mr-auto" href="/"> 
 <img src='asset/images/logo.png' height="30" width="41"
 alt="Ristornate Con Fusion"/>
        </NavbarBrand> 
         <Collapse Collapse isOpen={this.state.isNavOpen} navbar='true'>  
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
       </Collapse>  
      </div>
      <Nav className='ml-auto'  >
        <NavItem>
          <Button outline onClick={this.toggleModal}>
            <span className='fa fa-sign-in fa-md'>Login</span>
          </Button>
        </NavItem>
      </Nav>
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
   <Modal isOpen={this.state.modal} toggle={this.toggleModal} >
     <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
     <ModalBody>
<Form onSubmit={this.handleLogin}>
  <FormGroup>
    <Label htmlfor="username">Username</Label>
    <Input type='text' id='username' name='username' innerRef={(input)=> this.username =input}/>
  </FormGroup>
  <FormGroup>
    <Label htmlfor='password' >Password</Label>
    <Input type="password" name="password" innerRef={(input)=>this.password= input}/>
  </FormGroup>
  <FormGroup check>
    <Label check>
      <Input type="checkbox" name="remember" innerRef={(input)=> this.remember =input}/>
      Remember ME
    </Label>
  </FormGroup>
  <Button type='submit' value="submit" className="bg-primary mt-2">Login</Button>
</Form>
     </ModalBody>
   </Modal>
    </div>
      
            
      
  )
  }
}
export default Header;