import React, { Component } from "react";
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem, CardBody, CardText } from "reactstrap";
import { Link } from 'react-router-dom';
import {
    Button, Modal, ModalBody, ModalHeader, Label, Row, Col
} from "reactstrap";

import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from './shared/baseURL';




/**........................ comment component ends ................................................. */
//// validators
const required = (val) => val && val.length; //value > 0
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

class CommentForm extends Component {

    constructor(props) {
        super(props);


        this.state = {
            isCommentFormModalOpen: false
        };

        this.toggleCommentFormModal = this.toggleCommentFormModal.bind(this);
        this.handleCommentFormSubmit = this.handleCommentFormSubmit.bind(this);

    }

    handleCommentFormSubmit(values) {
        console.log("Current State is: " + JSON.stringify(values));
        // alert("Current State is: " + JSON.stringify(values));

        // action obj
        this.props.postComment( this.props.dishId, values.rating, values.author, values.comment );

    }

    toggleCommentFormModal() {
        this.setState({
            isCommentFormModalOpen: !this.state.isCommentFormModalOpen
        });
    }


    render() {
        return (
            <React.Fragment>
                <Button outline onClick={this.toggleCommentFormModal}>
                    <span className="fa fa-comments fa-lg"></span> Submit Comment
                </Button>


                {/* commentform  Modal */}
                <Modal isOpen={this.state.isCommentFormModalOpen} toggle={this.toggleCommentFormModal} >
                    <ModalHeader toggle={this.toggleCommentFormModal}> Submit Comment </ModalHeader>
                    <ModalBody>

                        <LocalForm onSubmit={(values) => this.handleCommentFormSubmit(values)}>

                            {/* rating */}
                            <Row className="form-group">
                                <Label htmlFor="rating" md={12} >Rating</Label>
                                <Col md={12}>
                                    <Control.select model=".rating"
                                        className="form-control"
                                        name="rating"
                                        id="rating"
                                        validators={{
                                            required
                                        }}
                                    >
                                        <option>Please Select</option>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                        }}
                                    />
                                </Col>
                            </Row>


                            {/* author */}
                            <Row className="form-group">
                                <Label htmlFor="author" md={12}> Your Name </Label>
                                <Col md={12}>
                                    <Control.text model=".author" id="author" name="author"
                                        placeholder="First Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </Col>
                            </Row>




                            {/* comment */}
                            <Row className="form-group">
                                <Label htmlFor="comment" md={12}>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="6"
                                        className="form-control"
                                        validators={{
                                            required
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                        }}
                                    />
                                </Col>

                            </Row>

                            {/* submit button */}
                            <Row className="form-group">
                                <Col>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>

                        </LocalForm>

                    </ModalBody>
                </Modal>


            </React.Fragment>
        );
    }
}

/**........................ comment component ends ................................................. */








    function RenderDish({dish}) {
        if (dish != null) {
            return (
                <div className='col-12 col-md-5 m-1'>
                   

                    <Card>
                        <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
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

    function RenderComments({ dish, comments, postComment, dishId }){
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

                
                    {comments.map((comment) => {
                        return (
                          
                                <li key={comment.id}>
                                    <p>{comment.comment}</p>
                                    <p>-- {comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}</p>
                                </li>
                          
                        );
                    })}
                

                <CommentForm 
                    dish={dish} 
                    comments={comments} 
                    dishId={dishId} 
                    postComment={postComment} 
                />
            </div>
        )
    }


    const DishDetail = (props) => {

        const dish = props.dish
        
        if (props.isLoading) {
            return (
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess){
            return (
                <div className="container">
                    <div className="row">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if (props.dish == null) {
            return (<div></div>);
        }
        else if (props.dish != null) {
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
                        <RenderComments dish={ props.dish } comments={ props.comments } 
                            postComment={ props.postComment }
                            dishId={ props.dish.id }
                        />
                    </div>
    
    
                </div>
            )
            
        }

    }



export default DishDetail;



// import React, { Component } from "react";
// import { Card, CardImg,CardTitle, Breadcrumb, BreadcrumbItem, CardBody, CardText } from "reactstrap";
// import { Link } from 'react-router-dom';
// import {
//     Button, Modal, ModalBody, ModalHeader, Label, Row, Col
// } from "reactstrap";
// //import CommentForm from '../component/CommentForm'
// import { Loading } from "./LoadingComponent";
// import { Control, LocalForm, Errors } from 'react-redux-form';
// import { baseUrl } from '../component/shared/baseURL'
// import {FadeTransform, Fade, Stagger} from 'react-animation-component'
// // /**........................ comment component ends ................................................. */


// // // validator//
//  const required=(val)=> val && val.length;
//  const minLength=(len)=> (val)=> (val) && (val.length>= len);
//  const maxLength=(len)=> (val)=> !(val) || (val.length<= len);


//  class CommentForm extends Component{
//    constructor(props){
//      super(props);


//      this.state={
//  isCommentFormOpen : false
//      }


//      this.CommentFormToggle=this.CommentFormToggle.bind(this);
//      this.HandleToSubmitCommentForm= this.HandleToSubmitCommentForm.bind(this);
//    }



//    CommentFormToggle(){
//      this.setState({
//        isCommentFormOpen: !this.state.isCommentFormOpen
//      })
//    }


//    HandleToSubmitCommentForm(values){
//     this.CommentFormToggle();
//     this.props.postComment(this.props.dishId, values.dishId, values.rating, values.author, values.comment)
     
//    }


//  render(){
//    return(
//      <React.Fragment>
//        <Button outline onClick={this.CommentFormToggle}>
//          <span className='fa fa-comment fa-md'></span>Submit Comments
//        </Button>
//        {/* creating the modal form for toggle submit*/}
//        <Modal isOpen={this.state.isCommentFormOpen} toggle={this.CommentFormToggle}>
//          <ModalHeader toggle={this.CommentFormToggle}>Submit Comment</ModalHeader>
//          <ModalBody>
//            <LocalForm onSubmit={(values)=>this.HandleToSubmitCommentForm(values)}>
//            {/*----------------------rating  --------------------*/}
//            <Row className='form-group'>
//              <Label htmlfor=".rating">Select</Label>
//              <Col md={12}>
//                <Control.select model='.rating' 
//                rows='6'
//                id='rating'
//                name='rating'
//                className="form-control"
//                validators={{required}}
//                > 
//                <option>please select</option>
//                <option> 1</option>
//                <option>2</option>
//                <option>3</option>
//                <option>4</option>
//                <option> 5</option>

//                </Control.select>
//                    <Errors
//                 className='text-danger'
               
//                 model='.rating'
//                 show='touched'
//                 messages={{
//                   required: 'required'
//                 }}/>
//              </Col>
//            </Row>
//              {/*---------------------- name  --------------------*/}
//              <Row className='form-group'>
//                <Label htmlfor='name'>Name</Label>
//               <Col  md={12}>
//                 <Control.text model='.author'
//                 id='author'
//                 name='name'
//                 className='form-control'
//                 rows='6'
//                 validators={
//                   {
//                     required, minLength: minLength(3), maxLength: maxLength(10)
//                   }
//                 }
//                 />
//                 <Errors
//                 className='text-danger'
//                 model='.author'
//                 show='touched'
//                 messages={{
//                   required: 'required',
//                   minLength:"must be greater than 3 character",
//                   maxLength:"must be smaller than 10 character"
//                 }}/>
//               </Col>
//              </Row>
//              {/*----------------------Feedback  --------------------*/}

//              <Row className='form-group'>
//                <Label htmlfor="textarea">Feedback review</Label>
//                <Col md={12}>
//                  <Control.textarea model='.textarea'
//                  id='textarea'
//                  name='textarea'
//                  className='form-control'
//                  rows='6'
//                  validators={
//                    {
//                      required,
//                    }
//                  }
//                  />
//                  <Errors
//                  className='text-danger'
//                  show='touched'
//                 model='.textarea'
//                 messages={{
//                   required: 'required'}
//                 }  />              
//                </Col>
//              </Row>
//               {/*----------------------submit button  --------------------*/}
//               <Row className='form-group'>
//               <Col className='mt-2'>
//               <Button type="submit" color="success">
//                 Submit Feedback
//               </Button>
//               </Col>  
//               </Row>
//               </LocalForm>
//          </ModalBody>
//        </Modal>
//      </React.Fragment>
//    )
//  }
//  }





//  function RenderDish({dish}) {
//   if (dish != null) {
//       return (
//           <div className='col-12 col-md-5 m-1'>
//               <Card>
//                   <CardImg width="100%" src={dish.image} alt={dish.name} />
//                   <CardBody>
//                       <CardTitle> {dish.name}</CardTitle>
//                       <CardText> {dish.description} </CardText>
//                   </CardBody>
//               </Card>
//           </div>   
//       );
//   }
//   else {
//       return (
//           <div></div>
//       );
//   }
// }

 
//     function RenderComments({dish, comments}){
//       if(comments== null){
//         return(<div></div>)
//       }
    
//  const cmnts = comments.map(comment => {
//       return (
          
//           <li key={comment.id}>
//               <p>{comment.comment}</p>
//               <p>-- {comment.author},
//               &nbsp;
//               {new Intl.DateTimeFormat('en-US', {
//                   year: 'numeric',
//                   month: 'long',
//                   day: '2-digit'
//               }).format(new Date(comment.date))}
//               </p>
//           </li>

//       )
//   })
    
//   return (
//       <div className='col-12 col-md-5 m-1'>
//           <h4> Comments </h4>
//           <ul className='list-unstyled'>
//               {cmnts}
//           </ul>
//           <CommentForm dish={dish} />
         
//       </div>
     
//   )
//     }
           
//     const DishDetail = (props) => {
// // if(props.isLoading){
// //   return(
// //     <div className="container">
// //       <div className="row">
// //         <Loading />
// //       </div>
// //     </div>
// //   )
// // }
 
// // else if(props.errmess){
// //   return (
// //     <div className="container">
// //       <div className="row">
// //         <h4>{props.errmess}</h4>
// //       </div>
// //     </div>
// //   )
// //   }


//         const dish = props.dish
        
//     if (dish == null) {
//       return(
//       <div></div>
//       )
//     }
//      return (
//         <div className="container">
//             <div className="row">
//                 <Breadcrumb>
//                     <BreadcrumbItem>
//                         <Link to="/menu">Menu</Link>
//                     </BreadcrumbItem>
//                     <BreadcrumbItem active>
//                         { props.dish.name }
//                     </BreadcrumbItem>
//                 </Breadcrumb>

//                 <div className="col-12">
//                     <h3> {props.dish.menu}</h3>
//                     <hr />
//                 </div>
//             </div>

//             <div className='row'>
//                 <RenderDish dish={ props.dish } />
//                 <RenderComments dish={props.dish} comments={ props.comments } />
//             </div>


//         </div>
//     )
     
//      }
    
// export default DishDetail;