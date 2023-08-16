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
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div className="App">
        <meta name="favicon" content="none" />
        <Routes>
          <Route path='/' element={<Home children={<HomeBody/>} />}/>
          <Route path='/product/:id' element={<Home children={<Product/>} />}/>
          <Route path='/login' element={<LogIn/>}/>
          <Route path='/search' element={<Search/>}/>

          <Route element={<PersistLogin />}>
              <Route path='/account' element={<Home children={<Account/>} />}/>
              <Route path='/cart' element={<Home children={<Cart/>} />}/>
          </Route>

        </Routes>
      </div>
    </Router>
  );
}

export default App;
