import React from 'react'
import Home from './HomeComponent'
import Menu from './menuComponent'
import DishDetail from './DishDetail'
import Contact from './ContactComponent'
import {DISHES} from '../component/shared/dishes'
import {COMMENTS} from '../component/shared/comments'
import {PROMOTIONS} from '../component/shared/promotions'
import {LEADERS} from '../component/shared/leaders'
import Header from './HeaderComponent'
import Footer from './FooterComponent'
import { Component } from 'react/cjs/react.production.min'
import {Switch, Redirect, Route} from 'react-router-dom'
  
 
class Main extends Component{

  constructor(props){
    super(props);

    this.state={
        dishes: DISHES,
        comments: COMMENTS,
        promotions: PROMOTIONS,
      leaders: LEADERS
    };
  }
 


  render(){
   const HomePage= ()=>{
     return(
     <Home dishes={this.state.dishes.filter((dish)=> dish.featured)[0]}
     promotion={this.state.promotions.filter((promo)=> promo.featured)[0]}
     leader={this.state.leaders.filter((lead)=> lead.featured)[0]} />
     )
   }
   const DishWithId=({match})=>
   {
return(
  <DishDetail dish={this.state.dishes.filter((dish)=> dish.id ===parseInt(match.params.dishId,10))[0]}
  comments={this.state.comments.filter((comment)=>comment.dishId=== parseInt(match.params.dishId,10))}
  />
)
   }
  return(
  < div className = "App" >
   
       <Header/>
     <Switch>
       <Route path='/home' component={HomePage}/>
       <Route exact path='/menu' component={()=><Menu dishes={this.state.dishes}/> } />
       <Route exact path='/menu/dishId' component={DishWithId}/>
       <Route exact path='/contactus' component={Contact}/>
      
       <Redirect to='/home'/>
     </Switch>
        <Footer/>
         </div>
    )
}
}

export default Main