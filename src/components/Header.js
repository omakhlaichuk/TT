import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => { 

    return (
        <div className="ui container">
            <Link to={'/'} > Game </Link>
            <Link to={'/rules'} > Rules </Link>
        </div>
    );
};

export default Header;