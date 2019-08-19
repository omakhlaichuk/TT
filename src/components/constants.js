export const message = {
    placeResource: resource => `Place the ${resource} or change it`,
    confirmResourcePlacement: resource => `Confirm placement ${resource} on chosen square or select another resource/square`,
    selectResourceAndPlace: "Select a resource and place it",
    selectResource: "Choose 1 of 3 available resources.",
    showPattern: "Select resources for building constraction. Then select the building for pattern check. Or continue resource placing.",
    patternDoesNotMatchBuilding: building => `The pattern doesn't match the ${building}. Select another buiding, change the pattern or start a new round.`,
    patternMatchesBuilding: building => `The pattern matches the ${building}. Select a square for the ${building} placement. All corresponding resources will be removed. Or start a new round.`,
    confirmBuildingPlacement: building => `This is a suitable square for the ${building} placement. Confirm to remove marked resources for the building constraction. Or change square or building. You can start a new round.`,
    successfulBuildingPlacement: "You've successfully placed the building! You can find another pattern or start a new round."


}

//phases
export const GAME_PHASE = "GAME_PHASE";
export const FEEDING_PHASE = "FEEDING_PHASE";
export const SCORING_PHASE = "SCORING_PHASE";

//square's occupants
export const EMPTY_SQUARE = { title: "EMPTY", type: "EMPTY" };
export const RESOURCE = "RESOURCE";
export const WOOD = { title: "WOOD", type: RESOURCE };
export const STONE = { title: "STONE", type: RESOURCE };
export const BRICK = { title: "BRICK", type: RESOURCE };
export const WHEAT = { title: "WHEAT", type: RESOURCE };
export const GLASS = { title: "GLASS", type: RESOURCE };

export const buildingsForFirstPlay =   ["Cottage", "Chapel", "Farm", "Tavern", "Well", "Theatr", "Factory"];

const INITIAL_BOARD = {
    indexes: [11, 12, 13, 14, 21, 22, 23, 24, 31, 32, 33, 34, 41, 42, 43, 44],
    fedCottages: 0
}
INITIAL_BOARD.indexes.forEach(index => {
    INITIAL_BOARD[index] = EMPTY_SQUARE;
});

//Prepare random list of resources
const shuffle = () => {
    const resources = [WOOD, STONE, BRICK, WHEAT, GLASS, WOOD, STONE, BRICK, WHEAT, GLASS, WOOD, STONE, BRICK, WHEAT, GLASS];
    let currentIndex = resources.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = resources[currentIndex];
        resources[currentIndex] = resources[randomIndex];
        resources[randomIndex] = temporaryValue;
    }
    return resources;
}

export const INITIAL_STATE = {
    resources: shuffle(),
    phase: GAME_PHASE,
    selectedPawn: {},
    selectedSquare: null,
    selectedPattern: [],
    buildings: [],
    initialBuilding: buildingsForFirstPlay,
    board: INITIAL_BOARD,
    message: message.selectResource
};





