import React from 'react'
import {Card,CardBody,CardImg,CardImgOverlay,CardText,CardTitle} from 'reactstrap'
import {Link} from 'react-router-dom';
import {Breadcrumb, BreadcrumbItem} from 'reactstrap'

function RenderDish({dish}) {
    if(dish!=null){
    return(
    <div className='col-12 col-md-5 m-1 '>
    
      <Card>
        <CardImg width="100%" src={dish.image} alt={dish.name}/>
         <CardBody>
           <CardImgOverlay>
           <CardTitle>{dish.name}</CardTitle>
           <CardText>{dish.description}</CardText>
          
           </CardImgOverlay>
           </CardBody>  
      </Card>

    </div>
   )}
    
   else{
   return(
     <div></div>
   )
   }
  }
  
 function RenderComment({comments}){
 if(comments != null){
   const commentList= comments.map((comment)=> {
return(
  <li key={comment.id}>
    <p>
      {comment.id}
    </p>
    <p>
      --{comment.author}, {new Intl.DateTimeFormat('en-us',{year: "numeric", month:"short", date:"2-digit" }).format(new Date(Date.parse(comment.date)))}
    </p>
  </li>
)
   })
  
  return(
<div className='col-12 col-md-5 m-1 '>
<h1>Comments</h1>
<ul className='list-unstyled'>
  {commentList}
</ul>
</div>
  )
 }


  else{
    return(
    <div></div>
    )
  }
}
  const DishDetail=(props) => {
    if(props.dish != null){
      return(
       <div className='container'>
          <div className="row">
                <Breadcrumb>
                <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                <BreadcrumbItem active> {props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr/>
                </div>
            </div>
            <div className='row'>
              <RenderDish dish={props.dish}/>
             <RenderComment comments={props.comments}/>
            </div>
            </div>
           
      )
      }
    else{
      return(
        <div></div>
      )
    }
  }
  

export default DishDetail;