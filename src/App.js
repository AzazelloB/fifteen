import React, { useState, useEffect } from 'react';

// hepler functions
import { getGrid, didWin, getTime } from './helpers';

// Components
import Grid from './components/Grid';
import Menu from './components/Menu';

// Hooks
import useKey from './hooks/useKey';

function App() {
    const [ size, setSize ] = useState( 4 );
    const [ grid, setGrid ] = useState( () => getGrid( size ) );
    const [ timer, setTimer ] = useState( { h: 0, m: 0, s: 0 } );
    const [ amountOfMoves, setAmountOfMoves ] = useState( 0 );
    const [ gameOver, setGameOver ] = useState( false );
    const [ gameStarted, setGameStarted ] = useState( false );
    const input = useKey( [ 'ArrowUp', 'ArrowDown', 'ArrowRight', 'ArrowLeft', ' ' ] );

    useEffect( () => {
        switch ( input ) {
            case 'arrowup': moveEmptyCell( { i: 1, j: 0 } ); break;
            case 'arrowleft': moveEmptyCell( { i: 0, j: 1 } ); break;
            case 'arrowright': moveEmptyCell( { i: 0, j: -1 } ); break;
            case 'arrowdown': moveEmptyCell( { i: -1, j: 0 } ); break;
            case ' ': resetGame(); break;
            default: break; // For react to shut the fuck up
        }

        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ input ] );

    useEffect( () => {
        let interval = null;
        if ( gameStarted ) {
            interval = setInterval( () => {
                setTimer( ( { h, m, s } ) => {
                    ++s;
                    if ( 0 !== s && 0 === s % 60 ) {
                        ++m;
                        s = 0;
                    }
                    if ( 0 !== m && 0 === m % 60 ) {
                        ++h;
                        m = 0;
                    }
                    return ( { h, m, s } );
                } );
            }, 1000 );
        }
        if ( gameOver ) {
            clearInterval( interval );
        }
        return () => clearInterval( interval );
    }, [ gameStarted, gameOver ] );

    const resetGame = newSize => {
        if ( 'number' !== typeof newSize ) {
            newSize = size;
        }
        setGameStarted( false );
        setTimer( { h: 0, m: 0, s: 0 } );
        setAmountOfMoves( 0 );
        setSize( newSize );
        setGrid( getGrid( newSize ) );
        setGameOver( false );
    };

    const updateGameState = grid => {
        if ( ! gameStarted ) {
            setGameStarted( true );
        }
        setAmountOfMoves( moves => ++moves );
        // setGrid( grid );

        if ( didWin( grid ) ) {
            setGameOver( true );
        }
    };

    const moveCell = ( { i, j } ) => {
        const newGrid = [ ...grid ];

        if ( size - 1 !== i && 0 === newGrid[ i + 1 ][ j ] ) {
            newGrid[ i + 1 ][ j ] = newGrid[ i ][ j ];
        } else if ( size - 1 !== j && 0 === newGrid[ i ][ j + 1 ] ) {
            newGrid[ i ][ j + 1 ] = newGrid[ i ][ j ];
        } else if ( 0 !== i && 0 === newGrid[ i - 1 ][ j ] ) {
            newGrid[ i - 1 ][ j ] = newGrid[ i ][ j ];
        } else if ( 0 !== j && 0 === newGrid[ i ][ j - 1 ] ) {
            newGrid[ i ][ j - 1 ] = newGrid[ i ][ j ];
        } else {
            return;
        }

        newGrid[ i ][ j ] = 0;

        updateGameState( newGrid );
    };

    const moveEmptyCell = ( { i, j } ) => {
        const newGrid = [ ...grid ];
        let zeroIndex = null;

        for ( let i = 0; i < newGrid.length; i++ ) {
            let j = newGrid[ i ].indexOf( 0 );
            if ( j > -1 ) {
                zeroIndex = { i, j };
                break;
            }
        }

        if ( 'undefined' !== typeof newGrid[ zeroIndex.i + i ] && 'undefined' !== typeof newGrid[ zeroIndex.i + i ][ zeroIndex.j + j ] ) {
             newGrid[ zeroIndex.i ][ zeroIndex.j ] = newGrid[ zeroIndex.i + i ][ zeroIndex.j + j ];
             newGrid[ zeroIndex.i + i ][ zeroIndex.j + j ] = 0;

             updateGameState( newGrid );
         }
    };

    return (
        <div className={ gameOver ? 'game game-over' : 'game' } >
            <Menu
                time={ getTime( timer ) }
                amountOfMoves={ amountOfMoves }
                resetGame={ resetGame }
                size={ size }
            />
            <Grid
                size={ size }
                grid={ grid }
                moveCell={ moveCell }
                gameOver={ gameOver }
                resetGame={ resetGame }
            />
        </div>
    );
}

export default App;
