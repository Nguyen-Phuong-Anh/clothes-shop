import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBagShopping, faMagnifyingGlass, faUser } from '@fortawesome/free-solid-svg-icons'
import ToggleBar from './toggleBar';

function NavBar() {
  
  const handleHidden = () => {
    const elem = document.getElementsByClassName('toggle')
    elem[0].classList.toggle('hidden')
  }
  
  return (
    <div className='container'>
      <Navbar fixed="top" className='navbar_body'>
        <Container fluid>
          <Navbar.Brand href="/">RAYNE</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="m-auto"
              style={{ maxHeight: '50px' }}
              navbarScroll
            >
              <Nav.Item className='m-3 navlink' onClick={handleHidden}>Clothes</Nav.Item>
              <Nav.Item className='m-3 navlink' onClick={handleHidden}>Shoes</Nav.Item>
            </Nav>
            <Form className="d-flex m-2">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Nav.Item className='m-2'>
                <FontAwesomeIcon className='icon' icon={faMagnifyingGlass} size='lg' />
              </Nav.Item>
            </Form>
            <Nav>
              <Nav.Link href='/account'>
                <FontAwesomeIcon className='icon' icon={faUser} size='lg' />
              </Nav.Link>
              <Nav.Link href='/cart'>
                <FontAwesomeIcon className='icon' icon={faBagShopping} size='lg' />
                <span className='badge'>
                  <Badge pill bg="danger">9</Badge>
                </span>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className='toggle hidden'>
        <ToggleBar/>
      </div>
    </div>
  );
}

export default NavBar;