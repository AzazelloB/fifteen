import React from 'react';

function Cell( { number, moveCell, position } ) {
    const move = () => {
        moveCell( position );
    }

    const style = {
        backgroundColor: ! number && 'transparent',
        cursor: ! number && 'default',
    }

    return (
        <button id={ number } className="cell" onClick={ move } style={style}>
            { number ? number : '' }
        </button>
    );
}

export default Cell;
