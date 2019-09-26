import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const Setup = () => { 

    return (
        <Button variant="light"><Link to="/game">NEW GAME</Link>
        </Button>

    );
};

export default Setup;