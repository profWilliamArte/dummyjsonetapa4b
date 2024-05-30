
import Footer from './Footer'
import Header from './Header'
import Inicio from '../pages/Inicio'
import Tienda from '../pages/Tienda'
import Laptop from '../pages/Laptop'
import Movil from '../pages/Movil'
import Categorias from '../pages/Categorias'
import Contactos from '../pages/Contactos'

import Vercompra from '../pages/Vercompra'
import Busquedas from '../pages/Busquedas'
import Miscompras from '../pages/Miscompras'
import Verdetalle from '../pages/Verdetalle'
import Productos from '../pages/Productos'
import ErrorSinAcceso from '../pages/ErrorSinAcceso'

import { useContext } from 'react'
import { carritoContext } from "../contexts/carritoContext";
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import {RutasProtegidas} from './RutasProtegidas'
const Rutas = () => {
    const { validado } = useContext(carritoContext)
  return (
    <BrowserRouter>
    
        <Header/>
          <Routes>
            <Route path="/" element={<Inicio/>} />
            <Route path="/tienda" element={<Tienda/>} />
            <Route path="/laptop" element={<Laptop/>} />
            <Route path="/movil" element={<Movil/>} />
            <Route path="/categorias/:id" element={<Categorias/>} />
            <Route path="/vercompra" element={<Vercompra/>} />
            <Route path='/busquedas' element={<Busquedas />}/>

            <Route element={<RutasProtegidas validado={validado}/>}>
                <Route path="/miscompras" element={<Miscompras/>} />
                <Route path="/verdetalle" element={<Verdetalle/>} />
                <Route path="/productos" element={<Productos/>} />
            </Route>

            
            <Route path='/errorsinacceso' element={<ErrorSinAcceso />}/>



            <Route path="/contactos" element={<Contactos/>} />

            <Route path="*" element={<Inicio/>} />
          </Routes>
         <Footer/>
         
      </BrowserRouter>
  )
}

export default Rutas