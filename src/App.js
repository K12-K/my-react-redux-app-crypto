import './App.css';
import 'antd/dist/antd.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Cryptocurrencies from './components/Cryptocurrencies';
import Exchanges from './components/Exchanges';
import News from './components/News';
import CryptoCoinDetail from './components/CryptoCoinDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/cryptocurrencies' element={<Cryptocurrencies />}></Route>
        <Route path='/exchanges' element={<Exchanges />}></Route>
        <Route path='/news' element={<News />}></Route>
        <Route path='/crypto/:uuid' element={<CryptoCoinDetail />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
