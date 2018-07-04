import { ADD_ANIMAL, ADD_CARDS } from '../constants';

const onlyReducer = (state, action) => {
    switch (action.type) {
        case ADD_CARDS:
            return {
                // previous state
                ...state,
                // the properties of our fetch
                ...action.payload,
                // but we don't want to overwrite the cards; we merge them
                cards: [...state.cards, ...action.payload.cards],

            };
        case ADD_ANIMAL:
            return { ...state, animals: [...state.animals, action.payload] };
        default:
            return state;
    }
}

export default onlyReducer;