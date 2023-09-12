import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket, faBagShopping, faMagnifyingGlass, faUser } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios'
import styles from './NavBar.module.css'
import useStore from '../../store/useStore';

function NavBar() {
  const { state, dispatch } = useStore()
  
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  const handleLogout = async () => {
    try {
      await axios.get('/logout', {
        withCredentials: true
      })
      
      dispatch({
        type: 'LOG_OUT'
      })
      
      navigate(from, { replace: true })
    } catch(err) {
      console.error(err);
    }
  }
  
  return (
    <div className={`container`}>
      <Navbar fixed="top" className={`${styles.navbar}`}>
        <Container fluid className={styles.navbar_body}>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              // className="m-auto"
              style={{ maxHeight: '50px' }}
              navbarScroll
            >
              <Nav.Item className={`${styles.navlink} m-3`} >Clothes</Nav.Item>
              <Nav.Item className={`${styles.navlink} m-3`} >Shoes</Nav.Item>
            </Nav>

            <Link to={"/"} className='link m-auto'><Navbar.Brand className={styles.brand}><span>RAYNE</span></Navbar.Brand></Link>

            <Form className={`d-flex me-3 ${styles.search_wrapper}`}>
              <Link aria-label='search' to={`/search`}>
                <Nav.Item className={`${styles.search_btn} ${styles.search_box}`}>
                    <FontAwesomeIcon className={styles.icon_search} icon={faMagnifyingGlass} />
                </Nav.Item>
              </Link>
            </Form>

            <Nav>
              <Link aria-label='account' to={state.userInfo.token ? '/account' : '/login'}>
                  <Nav.Item className='mt-2'>
                    <FontAwesomeIcon className={styles.icon} icon={faUser} />
                  </Nav.Item>
              </Link>

              <Link aria-label='cart' to={state.userInfo.token ? '/cart' : '/login'}>
                <Nav.Item className='m-2'>
                  <FontAwesomeIcon className={styles.icon} icon={faBagShopping} />
                  <span className={styles.badge}>
                    {state.cartItems > 0 && <Badge pill bg="danger">{state.cartItems}</Badge>}
                  </span>
                </Nav.Item>
              </Link>
              
              <Nav.Item className={`mt-2 ${state.userInfo.token ? '' : 'hidden'}`} onClick={handleLogout}>
                    <FontAwesomeIcon className={styles.icon} icon={faArrowRightFromBracket} />
              </Nav.Item>

            </Nav>
          </Navbar.Collapse>
        </Container>
        {/* <div className='toggle hidden'>
          <ToggleBar/>
        </div> */}
      </Navbar>
    </div>
  );
}

export default NavBar;