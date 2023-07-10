import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons'
import ToggleBar from './toggleBar';

function NavBar() {
  return (
    <div>
      <Navbar sticky="top" expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand href="/">Rayne</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link className='m-2'>Clothes</Nav.Link>
              <Nav.Link className='m-2'>Shoes</Nav.Link>
            </Nav>
            <Form className="d-flex m-2">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
            <Nav.Link href='/account'>
              <FontAwesomeIcon className='icon' icon={faUser} size='xl' />
            </Nav.Link>
            <Nav.Link href='/cart'>
              <FontAwesomeIcon className='icon' icon={faCartShopping} size='xl' />
            </Nav.Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <ToggleBar/>
    </div>
  );
}

export default NavBar;