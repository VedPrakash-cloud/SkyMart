import React from 'react';
import { Route, Routes } from 'react-router';
import Home from '../pages/Home';
import Products from '../pages/Products';
import Login from '../pages/Login';
import Register from '../pages/Register';
import About from '../pages/About';
import ProtectedRoute from './ProtectedRoute';
import MainLayout from './MainLayout';

const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>}/>

        <Route element={<MainLayout />}>
          <Route path="/" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }/>
        <Route path="/products" element={
          <ProtectedRoute>
            <Products/>
          </ProtectedRoute>
        }/>
        <Route path="/about" element={
          <ProtectedRoute>
            <About/>
          </ProtectedRoute>
        }/>
        </Route>
      </Routes>
    </div>
  )
}

export default AppRoutes
