import React, { Component } from 'react';

import Home from '../component/HomeComponent';
import Menu from '../component/menuComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import Header from '../component/HeaderComponent';
import Footer from '../component/FooterComponent';
import DishDetail from '../component/DishDetail';
import { actions} from 'react-redux-form'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { postComment, fetchDishes, fetchComments, fetchPromos } from '../redux/ActionCreator';

const mapStateToProps = state => {

    return{
        comments: state.comments,
        dishes: state.dishes,
        leaders: state.leaders,
        promotions: state.promotions,
    }
}       
const mapDispatchToProps=(dispatch)=>({
postComment: (dishId, rating, author , comment)=>dispatch(postComment(dishId, rating, author, comment)),
fetchDishes: ()=>{dispatch(fetchDishes())},
resetFeedbackForm:( )=>{dispatch(actions.reset('feedback'))},
fetchComments: ()=>{dispatch(fetchComments())},
fetchPromos: ()=>{dispatch(fetchPromos())},
fetchLeaders: () => dispatch(fetchLeaders()),
    
    
    postFeedback: (firstname, lastname, telnum, email, agree, contactType, message) => dispatch(postFeedback(firstname, lastname, telnum, email, agree, contactType, message)),

});



class Main extends Component {

    // constructor(props) {
    //     super(props);
    // }

    componentDidMount(){
       this.props.fetchDishes(); 
       this.props.fetchComments();
       this.props.fetchPromos();
       this.props.fetchLeaders();
    }
    render() {

        const HomePage = () => {
            return(
                <Home 
                    dish={ this.props.dishes.dishes.filter( (dish)=>dish.featured )[0] }
                    dishesLoading={this.props.dishes.isLoading} 
                    dishesErrmess={this.props.dishes.errmess}
                    promotion={this.props.promotions.promotions.filter( (promotion)=>promotion.featured )[0] }
                    promosLoading={this.props.promotions.isLoading} 
                    promosErrmess={this.props.promotions.errmess}
                    leader={this.props.leaders.filter( (leader)=>leader.featured )[0] }
                    leaderLoading={this.props.leaders.isLoading}
                    leaderErrMess={this.props.leaders.errMess}
                />
            );
        };

        const AboutUsPage = () => {
            return(
                <About 
                    leaders={this.props.leaders}
                    leaderLoading={this.props.leaders.isLoading}
                    leaderErrMess={this.props.leaders.errMess}
                />
            );
        };


        const DishWithId = ({match}) => {
            return(
                <DishDetail 
                
                dish={this.props.dishes.dishes.filter( (dish) => dish.id === parseInt(match.params.dishId, 10))[0] }
                DishesisLoading={this.props.dishes.isLoading} 
                DishesErrmess={this.props.dishes.errmess}
                comments={this.props.comments.comments.filter( (comment) => comment.dishId === parseInt(match.params.dishId, 10)) } 
                commentsisLoading={this.props.comments.isLoading} 
                commentsErrmess={this.props.comments.errmess}
                postComment={this.props.postComment}
                
                />
            );
        };



        return (
            <div>
                <Header></Header>
               <TransitionGroup>
                   <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
                <Switch>
                    <Route path="/home" component={ HomePage } />
                    <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes}/> }/>

                    <Route path="/menu/:dishId" component={DishWithId} />

                    <Route exact path="/contactus" component ={()=> <Contact resetFeedbackForm={this.props.resetFeedbackForm}/>}/>
                    <Route exact path="/aboutus" component={ AboutUsPage } />
                   
                    {/* if url dosesnt match, bydefault redirect to */}
                    <Redirect to="/home" />
                </Switch>
                </CSSTransition>
                </TransitionGroup>
                <Footer></Footer>
            </div> 
        );

    }

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
