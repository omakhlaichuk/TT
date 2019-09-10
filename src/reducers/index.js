import { INITIAL_STATE, EMPTY_SQUARE, RESOURCE, WILD } from './../components/constants';

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
    NEW_GAME,
    SCORE_TOTAL,
    SCORE_BUILDING,
    WILD_RESOURCE,
} from '../actions/types'



export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case NEW_GAME:
            return INITIAL_STATE;

        case SCORE_TOTAL:
            return { ...state, score: action.payload };

        case SCORE_BUILDING:
            return {
                ...state, buildings: [...state.buildings, state.buildings.map(
                    (building, type) => {
                        if (type === action.payload.buildingType) { building.score = action.payload.score };
                        return building
                    }
                )]
            };

        case CHANGE_PHASE:
            return { ...state, phase: action.payload };

        case CHANGE_MESSAGE:
            return { ...state, message: action.payload };

        case SELECT_PAWN:
            return { ...state, selectedPawn: action.payload };

        case SELECT_SQUARE:
            return { ...state, selectedSquare: action.payload };

        case SELECT_PATTERN:
            return { ...state, selectedPattern: action.payload };

        case CLEAR_SELECTION:
            return { ...state, selectedSquare: null, selectedPattern: [], selectedPawn: {} };

        case FETCH_BUILDING:
            return { ...state, buildings: [...state.buildings, action.payload] };

        //find placing recourse and move it to the end of line. Update Board with the recourse. Clear "selected"
        case PLACE_RESOURCE:
            //if resourse from wild - search for WILD 
            const moveFromIndex = state.resources.indexOf(
                state.selectedPawn.fromWild ? WILD : state.selectedPawn
            );
            // remove fromWild property
            const selectedPawn = { title: state.selectedPawn.title, type: RESOURCE }
            const movingResource = state.resources[moveFromIndex];
            state.resources.splice(moveFromIndex, 1);
            return {
                ...state,
                board: { ...state.board, [state.selectedSquare]: selectedPawn },
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

        case WILD_RESOURCE:
            return { ...state, resources: state.resources.map(resource => resource === state.selectedPawn ? WILD : resource) };

        default:
            return state;
    }
};