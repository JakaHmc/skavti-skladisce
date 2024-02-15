import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";
import { signOut } from 'firebase/auth';
import { auth } from './Firebase';
function NavigationBar() {

  const [expanded, setExpanded] = useState(false);

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };

  const closeNavbar = () => setExpanded(false);

  return (
    <>
    
      <Navbar bg="warning" variant="light" expand="false" expanded={expanded}>
        <Container>
          <Navbar.Brand href="/">Skavtska izposojevalnica</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" onClick={() => setExpanded(!expanded)} />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="me-auto flex-column" onClick={closeNavbar}>
              <Nav.Link as={Link} to="/" onClick={closeNavbar}>Vzemi</Nav.Link>
              <Nav.Link as={Link} to="/vrni" onClick={closeNavbar}>Vrni</Nav.Link>
              <Nav.Link as={Link} to="/pregled" onClick={closeNavbar}>Pregled</Nav.Link>
              <Nav.Link as={Link} to ="/dodaj" onClick={closeNavbar}>Dodaj</Nav.Link>
              <Nav.Link as={Link} to ="/izbrisi" onClick={closeNavbar}>Izbriši</Nav.Link>
              <Nav.Link as={Link} to ="/pokvarjeno" onClick={closeNavbar}>Pokvarjeno/popravljeno</Nav.Link>
              <Nav.Link onClick={logout}>Odjava</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavigationBar;
