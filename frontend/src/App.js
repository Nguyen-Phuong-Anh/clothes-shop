import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './views/Home';
import Product from './views/Product';
import Cart from './views/Cart';
import Search from './views/Search';
import HomeBody from './components/HomeBody';
import LogIn from './components/auth/LogIn';
import Account from './views/Account';
import PersistLogin from './components/auth/PersistLogin';
import Order from './views/Order';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div className="App">
        <meta name="favicon" content="none" />
        <Routes>
          <Route path='/' element={<Home children={<HomeBody/>} />}/>
          <Route path='/login' element={<LogIn/>}/>
          <Route path='/search' element={<Home children={<Search/>} />}/>
          
          <Route element={<PersistLogin />}>
              <Route path='/account' element={<Home children={<Account/>} />}/>
              <Route path='/cart' element={<Home children={<Cart/>} />}/>
              <Route path='/order' element={<Home children={<Order/>} />}/>
          </Route>
          <Route path='/products/:id' element={<Home children={<Product/>} />}/>

        </Routes>
      </div>
    </Router>
  );
}

export default App;
