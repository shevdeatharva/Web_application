import React from 'react';
import {Card, CardImg, CardText, CardBody, CardSubtitle} from 'reactstrap';
import { CardTitle } from 'reactstrap';
function RenderCard({item}){
return(
<Card>
  <CardImg width="100%" src={item.image} alt={item.name}/>
  <CardBody>
    <CardTitle>{item.name}</CardTitle>
    {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle>: null}
    <CardText>{item.description}</CardText>
  </CardBody>
</Card>
)
}





function Home(props) {
  return(
<div className='container'>
<div className="col-12">
                    <h3 className='text-center '>Home</h3>
                    <hr/>
                </div>
 <div className='row align-items-start'>
   <div className='col-12 col-md-4 m-1'>
     <RenderCard item={props.dishes}/>
   </div>
   <div className='col-12 col-md-4 m-1'>
     <RenderCard item={props.promotion}/>
   </div>
   <div className='col-12 col-md-4 m-1'>
     <RenderCard item={props.leader}/>
   </div>
 </div>
</div>
  )
  }
  export default Home;