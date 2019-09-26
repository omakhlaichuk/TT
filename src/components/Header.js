import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap'

const Header = () => {

    return (
        <Container>
            <Navbar bg="light" variant="light">
                <LinkContainer to={'/'} >
                    <Navbar.Brand href="/"><img width="60"
        height="44" src={`/images/TT-Logo-V2-Large-No-Chain_web.png`} ></img> </Navbar.Brand>
                </LinkContainer>
                <Nav className="mr-auto">
                    <LinkContainer to={'/game'} >
                        <Nav.Link >Game</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to={'/rules'} >
                        <Nav.Link >Rules</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to={'/score'} >
                        <Nav.Link>Score</Nav.Link>
                    </LinkContainer>
                </Nav>

            </Navbar>
        </Container>);
};

export default Header;

