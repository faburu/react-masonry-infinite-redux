import { ADD_ANIMAL, ADD_CARDS, SCROLLER } from '../constants';
import api from '../api';

// adds an Animal to the store
// { type: "ADD_ANIMAL", {id: 'text', species: "frog" }
const addAnimal = animal => ({ type: ADD_ANIMAL, payload: animal });

// before you do any actions, you have access to the old state.. after all, it's you whom changes it via a reducer
const fetchCards = page => async (dispatch, getState) => {
    api(page).then(result => {
        console.log('was', getState().moreCount, 'records remaining', result.moreCount);
        if ((getState().moreCount !== result.moreCount) && (result.moreCount > 0)) dispatch(setHasMore(true));
        return dispatch({ type: ADD_CARDS, payload: result });
    })
}

const setHasMore = hasMore => ({ type: SCROLLER, payload: hasMore });

export { addAnimal, fetchCards, setHasMore }