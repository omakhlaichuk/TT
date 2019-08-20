import { INITIAL_STATE, EMPTY_SQUARE, RESOURCE } from './../components/constants';

import {
    SELECT_PAWN,
    SELECT_SQUARE,
    SELECT_PATTERN,
    CLEAR_SELECTION,
    PLACE_RESOURCE,
    PLACE_BUILDING,
    FETCH_BUILDING,
    FEED_COTTAGES,
    CHANGE_PHASE,
    CHANGE_MESSAGE, 
    NEW_GAME
} from '../actions/types'



export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case NEW_GAME:
            return INITIAL_STATE;

        case CHANGE_PHASE:
            return { ...state, phase: action.payload };

        case CHANGE_MESSAGE:
            return { ...state, message: action.payload };

        case SELECT_PAWN:
            return { ...state, selectedPawn: action.payload };

        case SELECT_SQUARE:
            return { ...state, selectedSquare: action.payload };

        case SELECT_PATTERN:
            if (state.selectedPattern.find(el => el === action.payload)) {
                return { ...state, selectedPattern: state.selectedPattern.filter(el => el !== action.payload) };
            }
            return { ...state, selectedPattern: [...state.selectedPattern, action.payload] };

        case CLEAR_SELECTION:
            return { ...state, selectedSquare: null, selectedPattern: [], selectedPawn: {} };

        case FETCH_BUILDING:
            return { ...state, buildings: [...state.buildings, action.payload] };

        //find placing recourse and move it to the end of line. Update Board with the recourse. Clear "selected"
        case PLACE_RESOURCE:
            const moveFromIndex = state.resources.indexOf(state.selectedPawn);
            const movingResource = state.resources[moveFromIndex];
            state.resources.splice(moveFromIndex, 1);
            return {
                ...state,
                board: { ...state.board, [state.selectedSquare]: state.selectedPawn },
                selectedSquare: null,
                selectedPawn: {},
                resources: [...state.resources, movingResource]
            };

        case PLACE_BUILDING:
            state.selectedPattern.forEach(square => {
                // remove resource only
                if (state.board[square].type === RESOURCE) {
                    state.board[square] = EMPTY_SQUARE;
                }
            })
            return { ...state, board: { ...state.board, [state.selectedSquare]: state.selectedPawn }, selectedSquare: null, selectedPawn: {}, selectedPattern: [] };

        case FEED_COTTAGES:
            return { ...state, board: { ...state.board, fedCottages: action.payload } };


        default:
            return state;
    }
};



/*import { combineReducers } from 'redux';

import selectedReducer from './selectedReducer';


export default combineReducers({
    selected:selectedReducer

});*/