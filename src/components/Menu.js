import React from 'react';

import Select from './Select';

function Menu( { time, amountOfMoves, resetGame, size } ) {
    return (
        <div className="game-menu">
            <div  className="game-statistic">
                <span>Time: { time }</span>
                <span>Moves: { amountOfMoves }</span>
            </div>
            <div className="game-controls">
                <button onClick={ resetGame }>Shuffle</button>
                <Select
                    curr={ size }
                    changeSize={ resetGame }
                >
                    { [ ...Array( 6 ).keys() ].map( el => el + 2 ) }
                    { /* selectOption => (
                        [ ...Array( 6 ).keys() ].map( el => <div key={ el = el + 2 } id={ el } onClick={ selectOption } >{ el + 'x' + el }</div> )
                    ) */ }
                </Select>
            </div>
        </div>
    );
}

export default Menu;
