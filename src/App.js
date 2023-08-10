import logo from './logo.svg';
import './App.css';
import ButtonAppBar from './Header/Header';
import MusicPlayerSlider from "../src/check/check";
import Home from './HomePage/Home';
import Login from './Login/Login';
import { BrowserRouter, Router, Switch, Route, Routes } from "react-router-dom";


function App() {
  return (
    <div className="App">
       <BrowserRouter>

      <Routes>
        <Route exact path="/" element={<Login/>} />
        <Route path="/Home" element={<Home/>} />
      </Routes>
    </BrowserRouter>
      {/* <ButtonAppBar/> */}
      {/* <MusicPlayerSlider/>  */}
      {/* <Home/> */}
      {/* <Login/> */}
    </div>
  );
}

export default App;
