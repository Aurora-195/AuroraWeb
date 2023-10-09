import './App.css'
import {Route, Routes} from "react-router-dom"
import axios from "axios";

//import pages here
import Layout from './Layout'
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import MainPage from './pages/MainPage'

axios.defaults.baseURL = 'http://127.0.0.1:4000';
axios.defaults.withCredentials = true;

function App() {
  return (
    <Routes>

      <Route path="/" element={<Layout />}>
        <Route index element ={<IndexPage />} />
        <Route path ="/login" element={<LoginPage />} />
        <Route path ="/main" element={<MainPage />} />
      </Route>
      
    </Routes>
    
    )
}

export default App
