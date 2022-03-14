import './App.css';
// import Layout from "./components/Layout";
import React from "react";
import {Route, Routes} from "react-router-dom";
import Homepage from './components/pages/Homepage'
import Dashboard from './components/pages/Dashboard'
import PrivateOutlet from './routes/PrivateOutlet'
import PublicOutlet from './routes/PublicOutlet'
import RouterOutlet from "./routes/RouterOutlet";
import ProductList from "./components/pages/Product";
import ProductCreate from "./components/pages/Product/create";
import Login from "./components/pages/User/login";
import Register from "./components/pages/User/register";

function App() {
    return (
        <Routes>
            <Route  element={<RouterOutlet/>}>
                <Route path='/' element={<Homepage/>}/>
                <Route path='/*' element={<PublicOutlet/>}>
                    <Route path='login' element={<Login/>}/>
                    <Route path='register' element={<Register/>}/>

                </Route>
                <Route path='/*' element={<PrivateOutlet/>}>
                    <Route path='dashboard' element={<Dashboard/>}/>
                    <Route path='product' element={<ProductList/>}/>
                    <Route path='product/create' element={<ProductCreate/>}/>
                    <Route path='product/update/:id' element={<ProductCreate/>}/>
                </Route>
            </Route>
        </Routes>
    );
}

export default App;
