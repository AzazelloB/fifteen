import React from 'react';
// import { useSprings, animated } from 'react-spring';

import Cell from './Cell'

function Grid( { size, grid, moveCell, gameOver, resetGame } ) {
    const gridStyle = {
        gridTemplateRows: `repeat( ${size}, 1fr )`,
        gridTemplateColumns: `repeat( ${size}, 1fr )`,
    }
    const messageStyle = {
        display: gameOver ? 'block' : 'none'
    }

    // const calculateMargin = grid => {
    //     const size = grid.length - 1;
    //     const cellSize = 50;
    //     console.log(grid);
    //     for ( let i = 0; i < grid.length; i++ ) {
    //         for ( let j = 0; j < grid.length; j++ ) {
    //             if ( size !== i && 0 === grid[ i + 1 ][ j ] ) {
    //                 grid[ i ][ j ] = { marginTop: -cellSize };
    //             } else if ( size !== j && 0 === grid[ i ][ j + 1 ] ) {
    //                 grid[ i ][ j ] = { marginLeft: -cellSize };
    //             } else if ( 0 !== i && 0 === grid[ i - 1 ][ j ] ) {
    //                 grid[ i ][ j ] = { marginBottom: -cellSize };
    //             } else if ( 0 !== j && 0 === grid[ i ][ j - 1 ] ) {
    //                 grid[ i ][ j ] = { marginRight: -cellSize };
    //             } else {
    //                 grid[ i ][ j ] = { marginRight: -cellSize };
    //             }
    //         }
    //     }
    //
    //     return grid;
    // }
    //
    // // const springs = useSprings( grid.length * grid.length, index => ( { opacity: 1 } ) );
    // const [ springs ] = useSprings( grid.length * grid.length, calculateMargin( grid ) );
    //
    // const AnimatedCell = animated( Cell );

    return (
        <div className="grid" style={ gridStyle } >
            { grid.map( ( el, i ) => el.map( ( el, j ) =>
                <Cell key={ el } number={ el } position={{ i, j }} moveCell={ moveCell } />
            ) ) }
            { /* TODO: Finis */ }
            { /* springs.map( ( props, i, ) =>
                <AnimatedCell style={ props } key={ i } number={ i } position={{ i: 0, j: 0 }} moveCell={ moveCell } />
            ) */ }
            <button className="game-over-message" style={ messageStyle } onClick={ resetGame }>
                { gameOver ? 'Congratulations!' : '' }
            </button>
        </div>
    );
}

export default Grid;
