const preparedPattern = (pattern, board) => {
       
    const preparedPattern = pattern.map(cell => {
        return {
            x: cell.toString().charAt(0),
            y: cell.toString().charAt(1),
            resource: board[cell]
        }
    });

    const dx = Math.min(...preparedPattern.map(cell => Number(cell.x))) - 1;
    const dy = Math.min(...preparedPattern.map(cell => Number(cell.y))) - 1;

    const movedPattern = preparedPattern.map(cell => {
        return {
            x: cell.x - dx,
            y: cell.y - dy,
            resource: cell.resource

        }
    });

    return movedPattern;
}

export default preparedPattern;


