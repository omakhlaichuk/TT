import _ from 'lodash';


export const rotateAndMirrorPattern = pattern => {

    //[[12,"WOOD"],...] -> [{x: "1", y: "2", resource: "WOOD"},...]
    const indexToPoint = arr => arr.map(square => {
        return {
            x: square[0].toString().charAt(0),
            y: square[0].toString().charAt(1),
            resource: square[1]
        }
    });

    // Move to 11, [{x: "1", y: "2", resource: "WOOD"},...] -> [[12,"WOOD"],...] and sort by index
    const pointToIndex = arr => {
        //move to x=1, y=1
        const dx = Math.min(...arr.map(point => Number(point.x))) - 1;
        const dy = Math.min(...arr.map(point => Number(point.y))) - 1;
        arr.forEach(point => {
            point.x -= dx;
            point.y -= dy;
        });
        //[{x: "1", y: "2", resource: "WOOD"},...] -> [[12,"WOOD"],...]
        return arr.map(point => {
            const index = point.x.toString() + point.y.toString();
            return [index, point.resource]
            //and sort by index
        }).sort((a, b) => { return a[0] - b[0] });
    }

    const rotate = arr => arr.map(point => { return { x: -point.y, y: point.x, resource: point.resource } });

    const mirrorX = arr => arr.map(point => { return { x: -point.x, y: point.y, resource: point.resource } });

    const mirrorY = arr => arr.map(point => { return { x: point.x, y: -point.y, resource: point.resource } });

    const rotated0pattern = indexToPoint(pattern);
    const rotated1pattern = rotate(rotated0pattern);
    const rotated2pattern = rotate(rotated1pattern);
    const rotated3pattern = rotate(rotated2pattern);


    const rez = [
        rotated0pattern,
        mirrorY(rotated0pattern),

        mirrorX(rotated0pattern),

        rotated1pattern,
        mirrorX(rotated1pattern),
        mirrorY(rotated1pattern),

        rotated2pattern,
        mirrorX(rotated2pattern),
        mirrorY(rotated2pattern),

        rotated3pattern,
        mirrorX(rotated3pattern),
        mirrorY(rotated3pattern)
    ].map(pointPattern => pointToIndex(pointPattern));

    return _.uniqWith(rez, _.isEqual);
}

///ДУБЛИРУЕТСЯ С КОДОМ ВЫШЕ - отличие в том, что тут берется только title от объекта!!!
export const pointToIndex = arr => {
    //move to x=1, y=1
    const dx = Math.min(...arr.map(point => Number(point.x))) - 1;
    const dy = Math.min(...arr.map(point => Number(point.y))) - 1;
    arr.forEach(point => {
        point.x -= dx;
        point.y -= dy;
    });
    //[{x: "1", y: "2", resource: "WOOD"},...] -> [[12,"WOOD"],...]
    return arr.map(point => {
        const index = point.x.toString() + point.y.toString();
        return [index, point.resource.title]
        //and sort by index
    }).sort((a, b) => { return a[0] - b[0] });
};

export const preparedPattern = (pattern, board) => {
       
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