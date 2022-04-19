import { createStore, combineReducers, applyMiddleware } from 'redux';
import {Dishes } from '../redux/dishes';
import  {Leaders} from './Leader'
import { Promotions } from './Promotions'
 import { Comments } from './Comments';
import thunk from 'redux-thunk';
import logger from 'redux-logger'
import {createForms} from 'react-redux-form'
import { InitialFeedback } from './Forms';
// creating store
export const ConfigureStore = () => {
    const store = createStore( 
      combineReducers({
          dishes:Dishes,
          comments: Comments,
          promotions:Promotions,
          leaders: Leaders,
          ...createForms({
            feedback: InitialFeedback
          })

      }),
      applyMiddleware(thunk, logger)
    );

    return store;
}
