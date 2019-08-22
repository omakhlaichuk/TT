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
    SCORE_BUILDING
} from './types';

export const newGame = () => {
    return {
        type: NEW_GAME
    };
}

export const scoreTotal = score => {
    return {
        type: SCORE_TOTAL,
        payload: score
    };
}

export const scoreBuilding = (buildingType, score) => {
    return {
        type: SCORE_BUILDING,
        payload: { buildingType, score }
    };
}

export const selectPawn = pawn => {
    return {
        type: SELECT_PAWN,
        payload: pawn
    };
}

export const selectSquare = index => {
    return {
        type: SELECT_SQUARE,
        payload: index
    };
}

export const selectPattern = index => {
    return {
        type: SELECT_PATTERN,
        payload: index
    };
}

export const clearSelection = () => {
    return {
        type: CLEAR_SELECTION
    };
}

export const placeResource = () => {
    return {
        type: PLACE_RESOURCE
    };
}

export const placeBuilding = () => {
    return {
        type: PLACE_BUILDING
    };
}

export const fetchBuilding = building => {
    return {
        type: FETCH_BUILDING,
        payload: building
    };
}

export const changePhaseTo = phase => {
    return {
        type: CHANGE_PHASE,
        payload: phase
    };
}

export const changeMessage = message => {
    return {
        type: CHANGE_MESSAGE,
        payload: message
    };
}

export const feedCottages = cottages => {
    return {
        type: FEED_COTTAGES,
        payload: cottages
    };
}