import { useState, useEffect } from 'react';

function useKey( keys ) {

    const [ key, setKey ] = useState( '' );

    useEffect( () => {
        const match = e => keys.map( el => el.toLowerCase() ).includes( e.key.toLowerCase() );

        const onDown = e => {
            if ( match( e ) ) {
                setKey( e.key.toLowerCase() );
            }
        }

        const onUp = e => {
            setKey( '' );
        }

        window.addEventListener( 'keydown', onDown );
        window.addEventListener( 'keyup', onUp );

        return () => {
            window.removeEventListener( 'keydown', onDown );
            window.removeEventListener( 'keyup', onUp );
        }
    }, [ keys ] );

    return key;
}

export default useKey;
