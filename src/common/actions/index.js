import { ADD_ANIMAL, ADD_CARDS } from '../constants';
import api from '../api';

// adds an Animal to the store
// { type: "ADD_ANIMAL", {id: 'text', species: "frog" }
const addAnimal = animal => ({ type: ADD_ANIMAL, payload: animal });

const fetchCards = page => async (dispatch, getState) => {
    api(page).then(result => {
        return dispatch({ type: ADD_CARDS, payload: result });
    })
}

const inifiniteSwitch = canContinue => ({ type: SCROLLER, payload: canContinue });

export { addAnimal, fetchCards }