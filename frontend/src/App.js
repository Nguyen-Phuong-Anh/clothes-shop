import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './views/Home';
import HomeBody from './components/HomeBody';
import Product from './views/Product';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<Home children={<HomeBody/>} />}/>
          <Route path='/product' element={<Home children={<Product/>} />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
