import React, {Component} from 'react';
import { ModalBody, ModalHeader, Label, Col, Button, Row } from 'reactstrap';
import {Modal} from 'react-modal'
import {Control, Errors, LocalForm} from 'react-redux-form'
// validator//
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
              id='rating'
              name='rating'
              className="form-control"
              validators={{required}}
              > 
              <option>please select</option>
              <option>please 1</option>
              <option>please 2</option>
              <option>please 3</option>
              <option>please 4</option>
              <option>please 5</option>

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
               <Control.text model='.name'
               id='name'
               name='name'
               className='form-control'
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
               }}></Errors>
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
             <Col>
             <Button type="submit" color="primary">
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
export default CommentForm