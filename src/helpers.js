
const randomCell = range => {
    return range.splice( Math.floor( Math.random() * range.length ), 1 )[0];
};

export const getGrid = size => {
    const range = [ ...Array( size * size ).keys() ];
    let grid = [];

    while ( ! isSolvable( grid ) ) {
        const newRange = range.slice( 0 );
        grid = [ ...Array( size ) ].map( ( el, i ) => [ ...Array( size ) ].map( ( el, j ) => randomCell( newRange ) ) );
    }

    return grid;
};

// TODO: still does not work
const isSolvable = grid => {
    if ( ! grid.length ) {
        return false;
    }

    const array1D = [].concat( ...grid ),
          size = grid.length;

    let countInversions = 0,
        row = 0,
        zeroRow = 0;

    for ( let i = 0; i < array1D.length; i++ ) {
        if ( i % size === 0 ) { // advance to next row
            row++;
        }
        if ( array1D[ i ] === 0 ) { // the blank tile
            zeroRow = row; // save the row on which encountered
            // zeroRow = Math.ceil( ( i + 1 ) / size ); // save the row on which encountered
            continue;
        }
        for ( let j = i + 1; j < array1D.length; j++ ) {
            if ( array1D[ i ] > array1D[ j ] && array1D[ j ] !== 0 ) {
                countInversions++;
            }
        }
    }
    // console.log(zeroRow);
    if ( size % 2 === 0 ) { // even grid
        if ( zeroRow % 2 === 0 ) { // blank on odd row; counting from bottom
            return countInversions % 2 === 0;
        } else { // blank on even row; counting from bottom
            return countInversions % 2 !== 0;
        }
    } else { // odd grid
        return countInversions % 2 === 0;
    }
};

export const didWin = grid => {
    const size = grid.length - 1;
    // Do not check all cells if blank cell is not in right bottom corner
    if ( 0 !== grid[ size ][ size ] ) {
        return false;
    }

    for ( let i = size; i >= 0; i-- ) {
        //  check all but last cell
        for ( let j = size - 1; j >= 0; j-- ) {
            // check if current sell in on its place comparing it to index in array
            // adding 1 to size because we substracted one from real size at the beginning
            // adding 1 to sum because we need to turn index to number
            if ( grid[ i ][ j ] !== ( i * ( size + 1 ) + j ) + 1 ) {
                return false;
            }
        }
    }

    return true;
};

export const getTime = ( { h, m, s } ) => {
    if ( s < 10 ) {
        s = '0' + s;
    }
    if ( m < 10 ) {
        m = '0' + m;
    }

    return h + ':' + m + ':' + s;
};
