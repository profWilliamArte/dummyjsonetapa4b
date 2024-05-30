
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'

import Carrito from './contexts/Carrito'



import Rutas from './components/Rutas'


function App() {
 
  
  return (
    <>
      <Carrito>
        <Rutas/>
      </Carrito>
    </>
  )
}

export default App
