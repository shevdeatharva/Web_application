import { createStore, combineReducers } from 'redux';
import {Dishes } from '../redux/dishes';
import  {Leaders} from './Leader'
import { Promotions } from './Promotions'
 import { Comments } from './Comments';

// creating store
export const ConfigureStore = () => {
    const store = createStore( 
      combineReducers({
          dishes:Dishes,
          comments: Comments,
          promotions:Promotions,
          leaders: Leaders

      })
    );

    return store;
}
