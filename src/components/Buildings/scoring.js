const boardCalc = {

    indexToX: index => parseInt(index.toString().charAt(0)),
    indexToY: index => parseInt(index.toString().charAt(1)),
    xyToIndex: (x, y) => parseInt(x.toString() + y.toString()),

    //2-4  adjacent indexes
    getAdjacent: index => {
        const x = boardCalc.indexToX(index);
        const y = boardCalc.indexToY(index);
        const adjacent = [];
        if (x > 1) { adjacent.push(boardCalc.xyToIndex(x - 1, y)) };
        if (x < 4) { adjacent.push(boardCalc.xyToIndex(x + 1, y)) };
        if (y > 1) { adjacent.push(boardCalc.xyToIndex(x, y - 1)) };
        if (y < 4) { adjacent.push(boardCalc.xyToIndex(x, y + 1)) };
        return adjacent;
    },

    //3 indexes from same row
    getRow: index => {
        const x = boardCalc.indexToX(index);
        const row = [];
        for (let i = 1; i < 5; i++) {
            if (index !== parseInt(`${x}${i}`)) {
                row.push(parseInt(`${x}${i}`));
            }
        }
        return row;
    },

    //3 indexes from same column
    getColumn: index => {
        const y = boardCalc.indexToY(index);
        const column = [];
        for (let i = 1; i < 5; i++) {
            if (index !== parseInt(`${i}${y}`)) {
                column.push(parseInt(`${i}${y}`));
            }
        }
        return column;
    },

    //return [indexes] of the buildings
    findBuildings: (board, buildingTitle) => board.indexes.filter(index => board[index].title === buildingTitle),

    //return [indexes] of adjacent buildings with type
    getAdjacentWithType: (board, index, type) => boardCalc.getAdjacent(index).filter(i => board[i].type === type),
};


export const calcScore = {

    //3VP for each Fed Cottage
    Cottage: board => { return 3 * board.fedCottages },

    //1VP for each Fed Cottage for each Chapel
    Chapel: board => { return boardCalc.findBuildings(board, "Chapel").length * board.fedCottages },

    //0
    Farm: () => { return 0 },

    //0-0,1-2, 2-5, 3-9, 4-14, 5+ - 20
    Tavern: board => {
        switch (boardCalc.findBuildings(board, "Tavern").length) {
            case 0: return 0;
            case 1: return 2;
            case 2: return 5;
            case 3: return 9;
            case 4: return 14;
            default: return 20;
        }
    },

    // 1VP per each adjacent Cottage for each Well
    Well: board => {
        let score = 0;
        boardCalc.findBuildings(board, "Well").forEach(wellIndex => {
            score += boardCalc.getAdjacentWithType(board, wellIndex, 0).length
        });
        return score;
    },

    //1VP for each unique building in the same row&column
    Theatr: board => {
        let score = 0;
        boardCalc.findBuildings(board, "Theatr").forEach(
            theatrIndex => {
                score += [...new Set([...boardCalc.getRow(theatrIndex), ...boardCalc.getColumn(theatrIndex)]
                    .map(ind => {
                        return board[ind].type
                    })
                    //selecting buildings only
                    .filter(type =>
                        type >= 0 && type <= 9
                    )
                )].length
            }
        )
        return score
    },

    //0
    Factory: () => { return 0 },
};


//simple case
export const calcFedCottages = (board, buildings) => {
    const cottageNum = boardCalc.findBuildings(board, "Cottage").length;
    const needFood = cottageNum * buildings[0].toBeFed;
    const producedFood = boardCalc.findBuildings(board, buildings[2].title).length * buildings[2].canFeeds;
    if (needFood > producedFood) { return Math.floor(producedFood / buildings[0].toBeFed) };
    return cottageNum;
}




