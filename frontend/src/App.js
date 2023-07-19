import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './views/Home';
import HomeBody from './components/HomeBody';
import Product from './views/Product';
import Cart from './views/Cart';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<Home children={<HomeBody/>} />}/>
          <Route path='/product/:id' element={<Home children={<Product/>} />}/>
          <Route path='/cart' element={<Home children={<Cart/>} />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
