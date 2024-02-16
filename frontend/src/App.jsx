import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Dashboard, SignIn, SignUp, Transfer } from './components'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/transfer/:userName/:userId' element={<Transfer />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
