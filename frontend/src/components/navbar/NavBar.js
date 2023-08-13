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
import useStore from '../../store/useStore';

function NavBar() {
  const [search, setSearch] = useState('')
  const { state } = useStore()
  
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

  let humanButton = null
  
  
  return (
    <div className='container'>
      <Navbar fixed="top" className={styles.navbar_body}>
        <Container fluid>
          <Link to={"/"} className='link'><Navbar.Brand>RAYNE</Navbar.Brand></Link>
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
              <Link to={state.userInfo.token ? '/account' : '/login'}>
                  <Nav.Item className='mt-2'>
                    <FontAwesomeIcon className={styles.icon} icon={faUser} size='lg' />
                  </Nav.Item>
              </Link>

              {/* <Link to={'/account'}>
                  <Nav.Item className='mt-2'>
                    <FontAwesomeIcon className={styles.icon} icon={faUser} size='lg' />
                  </Nav.Item>
              </Link> */}

              <Link to={"/cart"}>
                <Nav.Item className='m-2'>
                  <FontAwesomeIcon className={styles.icon} icon={faBagShopping} size='lg' />
                  <span className={styles.badge}>
                    {state.cartItems > 0 && <Badge pill bg="danger">{state.cartItems}</Badge>}
                  </span>
                </Nav.Item>
              </Link>
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