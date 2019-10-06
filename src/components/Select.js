import React, { useState } from 'react';
import { useTrail, animated } from 'react-spring';

function Select( { curr, changeSize, children } ) {
    const [ isOpened, toggleOpened ] = useState( false );

    const toggleDropdown = () => {
        toggleOpened( isOpened => ! isOpened );
    }

    const selectOption = e => {
        if ( isOpened ) {
            changeSize( parseInt( e.target.id ) );
        }
        toggleDropdown();
    }

    const dropClass = isOpened ? 'dropdown-wrapper opened' : 'dropdown-wrapper';

    const config = { tension: 400, friction: 50 };
    const trail = useTrail( children.length, {
        config,
        x: 35,
        b: 90,
        from: { x: 0, b: 100 },
        reverse: ! isOpened,
    } );

    return (
        <div className={ dropClass }>
            <div className="dropdown" onClick={ toggleDropdown }>
                <div className="dropdown-selected">
                    { curr + 'x' + curr }
                </div>

                <div className="dropdown-arrow"></div>
            </div>
            <div className="dropdown-options">
                { trail.map( ( { x, b }, i ) => (
                    <animated.div
                        key={ children[ i ] }
                        id={ children[ i ] }
                        onClick={ selectOption }
                        style={ {
                            zIndex: children[ i ] === curr ? children.length : children.length - i,
                            filter: 0 === i % 2 && children[ i ] === curr && b.interpolate( b => `brightness( ${ b }% )` ),
                            transform: x.interpolate( x => `translate3d( 0, ${ x * i }px, 0 )` )
                        } }
                    >
                    { children[ i ] + 'x' + children[ i ] }
                    </animated.div>
                ) ) }
            </div>
        </div>
    );
}

export default Select;
