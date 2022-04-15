import React, { Component } from "react";
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem, CardBody, CardText } from "reactstrap";
import { Link } from 'react-router-dom';
import {
    Button, Modal, ModalBody, ModalHeader, Label, Row, Col
} from "reactstrap";
//import CommentForm from '../component/CommentForm'
import { Control, LocalForm, Errors } from 'react-redux-form';
// /**........................ comment component ends ................................................. */


// // validator//
 const required=(val)=> val && val.length;
 const minLength=(len)=> (val)=> (val) && (val.length>= len);
 const maxLength=(len)=> (val)=> !(val) || (val.length<= len);


 class CommentForm extends Component{
   constructor(props){
     super(props);


     this.state={
 isCommentFormOpen : false
     }


     this.CommentFormToggle=this.CommentFormToggle.bind(this);
     this.HandleToSubmitCommentForm= this.HandleToSubmitCommentForm.bind(this);
   }



   CommentFormToggle(){
     this.setState({
       isCommentFormOpen: !this.state.isCommentFormOpen
     })
   }


   HandleToSubmitCommentForm(values){
     console.log('current State is:' + JSON.stringify(values))
 alert("rating:" + JSON.stringify(values))
   }


 render(){
   return(
     <React.Fragment>
       <Button outline onClick={this.CommentFormToggle}>
         <span className='fa fa-comment fa-md'></span>Submit Comments
       </Button>
       {/* creating the modal form for toggle submit*/}
       <Modal isOpen={this.state.isCommentFormOpen} toggle={this.CommentFormToggle}>
         <ModalHeader toggle={this.CommentFormToggle}>Submit Comment</ModalHeader>
         <ModalBody>
           <LocalForm onSubmit={(values)=>this.HandleToSubmitCommentForm(values)}>
           {/*----------------------rating  --------------------*/}
           <Row className='form-group'>
             <Label htmlfor=".rating">Select</Label>
             <Col md={12}>
               <Control.select model='.rating' 
               rows='6'
               id='rating'
               name='rating'
               className="form-control"
               validators={{required}}
               > 
               <option>please select</option>
               <option> 1</option>
               <option>2</option>
               <option>3</option>
               <option>4</option>
               <option> 5</option>

               </Control.select>
                   <Errors
                className='text-danger'
               
                model='.rating'
                show='touched'
                messages={{
                  required: 'required'
                }}/>
             </Col>
           </Row>
             {/*---------------------- name  --------------------*/}
             <Row className='form-group'>
               <Label htmlfor='name'>Name</Label>
              <Col  md={12}>
                <Control.text model='.author'
                id='author'
                name='name'
                className='form-control'
                rows='6'
                validators={
                  {
                    required, minLength: minLength(3), maxLength: maxLength(10)
                  }
                }
                />
                <Errors
                className='text-danger'
                model='.author'
                show='touched'
                messages={{
                  required: 'required',
                  minLength:"must be greater than 3 character",
                  maxLength:"must be smaller than 10 character"
                }}/>
              </Col>
             </Row>
             {/*----------------------Feedback  --------------------*/}

             <Row className='form-group'>
               <Label htmlfor="textarea">Feedback review</Label>
               <Col md={12}>
                 <Control.textarea model='.textarea'
                 id='textarea'
                 name='textarea'
                 className='form-control'
                 rows='6'
                 validators={
                   {
                     required,
                   }
                 }
                 />
                 <Errors
                 className='text-danger'
                 show='touched'
                model='.textarea'
                messages={{
                  required: 'required'}
                }  />              
               </Col>
             </Row>
              {/*----------------------submit button  --------------------*/}
              <Row className='form-group'>
              <Col className='mt-2'>
              <Button type="submit" color="success">
                Submit Feedback
              </Button>
              </Col>  
              </Row>
              </LocalForm>
         </ModalBody>
       </Modal>
     </React.Fragment>
   )
 }
 }






    function RenderDish({dish}) {
        if (dish != null) {
            return (
                <div className='col-12 col-md-5 m-1'>
                    <Card>
                        <CardImg width="100%" src={dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle> {dish.name}</CardTitle>
                            <CardText> {dish.description} </CardText>
                        </CardBody>
                    </Card>
                </div>   
            );
        }
        else {
            return (
                <div></div>
            );
        }
    }

    function RenderComments({dish,comments}){
        if (comments == null) {
            return (<div></div>)
        }
        const cmnts = comments.map(comment => {
            return (
                
                <li key={comment.id}>
                    <p>{comment.comment}</p>
                    <p>-- {comment.author},
                    &nbsp;
                    {new Intl.DateTimeFormat('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: '2-digit'
                    }).format(new Date(comment.date))}
                    </p>
                </li>

            )
        })
        return (
            <div className='col-12 col-md-5 m-1'>
                <h4> Comments </h4>
                <ul className='list-unstyled'>
                    {cmnts}
                </ul>
                <CommentForm dish={CommentForm}></CommentForm>
            </div>
        )
    }


    const DishDetail = (props) => {

        const dish = props.dish
        
    
        if (dish == null) {
            return (<div></div>);
        }

        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to="/menu">Menu</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>
                            { props.dish.name }
                        </BreadcrumbItem>
                    </Breadcrumb>

                    <div className="col-12">
                        <h3> {props.dish.menu}</h3>
                        <hr />
                    </div>
                </div>

                <div className='row'>
                    <RenderDish dish={ props.dish } />
                    <RenderComments dish={props.dish} comments={ props.comments } />
                </div>


            </div>
        )
    }



export default DishDetail;