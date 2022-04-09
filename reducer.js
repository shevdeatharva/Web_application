import {DISHES} from '../component/shared/dishes';
import {PROMOTIONS} from '../component/shared/promotions';
import {COMMENTS} from '../component/shared/comments';
import {LEADERS} from '../component/shared/leaders';

export const intialState={
  dishes: DISHES,
  comments: COMMENTS,
  leader: LEADERS,
  promotions: PROMOTIONS
}
export const Reducer=(state=intialState, action)=>{
  return state;
}