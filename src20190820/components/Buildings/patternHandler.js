import _ from 'lodash';
//                        style={style(resource[0] % 10, Math.floor(resource[0] / 10))}

const d = (arr, index) => Math.min(...arr.map(cell => Number(cell[index]))) - 1;

export const pointToIndex = (arr, title) => {
    //move to x=1, y=1
    const dx = d(arr, "x");
    const dy = d(arr, "y");
    arr.forEach(point => {
        point.x -= dx;
        point.y -= dy;
    });
    //[{x: 1, y: 2, resource: "WOOD"},...] -> [[12,"WOOD"],...]
    return arr.map(point => {
        const index = point.x * 10 + point.y;
        return title ? [index, point.resource.title] : [index, point.resource]
        //and sort by index
    }).sort((a, b) => { return a[0] - b[0] });
}

export const preparedPattern = (pattern, board) => {

    const preparedPattern = pattern.map(cell => {
        return {
            x: cell % 10,
            y: Math.floor(cell / 10), //cell.toString().charAt(1),
            resource: board[cell]
        }
    });

    const dx = d(preparedPattern, "x");
    const dy = d(preparedPattern, "y");

    return preparedPattern.map(cell => {
        return {
            x: cell.x - dx,
            y: cell.y - dy,
            resource: cell.resource
        }
    });
}

export const rotateAndMirrorPattern = pattern => {

    //[[12,"WOOD"],...] -> [{x: "1", y: "2", resource: "WOOD"},...]
    const indexToPoint = arr => arr.map(square =>  {
        return {
            x: square[0] % 10,
            y: Math.floor(square[0] / 10),
            resource: square[1]
        }
    });

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