import React from 'react';
import { Link } from 'react-router-dom';

function MenuList(props) {
    return (
        <div>
            <Link to="/">Inicio</Link>
            <Link to="/acerca-de">Acerca de</Link>
            <Link to="/contacto">Contacto</Link>
        </div>
    );
}

export default MenuList;
