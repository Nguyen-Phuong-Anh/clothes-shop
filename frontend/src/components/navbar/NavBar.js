import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBagShopping, faMagnifyingGlass, faUser } from '@fortawesome/free-solid-svg-icons'
import ToggleBar from './toggleBar';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import styles from './NavBar.module.css'

function NavBar({itemLength}) {
  const [search, setSearch] = useState('')
  
  const handleHidden = () => {
    const elem = document.getElementsByClassName('toggle')
    elem[0].classList.toggle('hidden')
  }

  const handleSearch = async () => {
    try {
      await axios.post("/search", {
        search
      }).then(res => console.log(res.data))
    } catch(err) {
      console.error(err)
    }
  }
  
  return (
    <div className='container'>
      <Navbar fixed="top" className={styles.navbar_body}>
        <Container fluid>
          <Navbar.Brand href="/">RAYNE</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="m-auto"
              style={{ maxHeight: '50px' }}
              navbarScroll
            >
              <Nav.Item className={`${styles.navlink} m-3`} onClick={handleHidden}>Clothes</Nav.Item>
              <Nav.Item className={`${styles.navlink} m-3`} onClick={handleHidden}>Shoes</Nav.Item>
            </Nav>

            <Form className="d-flex m-2">
              <input value={search} onChange={e => setSearch(e.target.value)} type='text' placeholder='Search' className={styles.nav_search} />
              <Link to={"/search"}>
                <Nav.Item className='m-2'>
                  <FontAwesomeIcon className={styles.icon} icon={faMagnifyingGlass} onClick={handleSearch} size='lg' />
                </Nav.Item>
              </Link>
            </Form>

            <Nav>
              <Nav.Link href='/account'>
                <FontAwesomeIcon className={styles.icon} icon={faUser} size='lg' />
              </Nav.Link>
              <Nav.Link href='/cart'>
                <FontAwesomeIcon className={styles.icon} icon={faBagShopping} size='lg' />
                <span className={styles.badge}>
                  {itemLength > 0 && <Badge pill bg="danger">{itemLength}</Badge>}
                </span>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
        <div className='toggle hidden'>
          <ToggleBar/>
        </div>
      </Navbar>
    </div>
  );
}

export default NavBar;