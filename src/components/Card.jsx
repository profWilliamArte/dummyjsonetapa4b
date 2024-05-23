
import { useState } from "react";
import Detalle from "./Detalle";


import { useContext } from "react";
import { carritoContext } from "../contexts/carritoContext";

const Card = ({producto}) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { cart, agregar, vaciar, eliminar, comprar } = useContext(carritoContext)

    const getCantidad=(producto)=>{
        return cart.find((item)=> item.id === producto.id)?.cantidad || 0
    }
    const [cant, setCant] = useState(() => getCantidad(producto) || 1);
    const handleChange = (event) => {
      setCant(event.target.value);
    };
  
    
  
  
   
    const totalProd=getCantidad(producto)


    const precioFinal = producto.price - (producto.price * (producto.discountPercentage / 100));
    return ( 
    <>
        <div className="col-sm-6 col-md-4 col-lg-3  mb-4" >
                <div className="card h-100">
                <div className="card-header p-0">
                {
                        totalProd > 0 && (
                          <span
                          className="badge rounded-pill text-bg-warning fs-3 m-1"  style={{ position: 'absolute', top: '0', right: '0', zIndex: '1' }}>
                            {totalProd}
                        </span>  
                        )
                    }
                    <img src={producto.thumbnail} alt={producto.title}  className="img-fluid" />
                </div>
                <div className="card-body text-center d-flex flex-column justify-content-between">
                    <h5>{producto.title}</h5>
                    <p className="text-success">Stock: {producto.stock}</p>

                    <p className="text-danger">
                        Precio: {producto.price.toFixed(0).toLocaleString()}$
                        <br/>
                    <span className="text-danger">Desc: {producto.discountPercentage.toFixed(0).toLocaleString()}%</span><br/>
                    <span className="text-danger">Precio Final: {precioFinal.toFixed(0).toLocaleString()}$</span></p>
                    
                    <hr/>
                    <button className="btn btn-danger btn-sm mx-1"  onClick={handleShow}>Detalle</button>
                </div>
                <div className="card-footer text-center">
          
                


            <div className="d-flex justify-content-center"> 

            <input 
            type="number" 
            value={cant} 
            onChange={handleChange}  
            className="form-control bg-dark text-white"  
            style={{width:80}} 
            onFocus={(e) => e.target.select()}
            min={0}
            />
                
            {totalProd === 0 ? (
            <button className="btn btn-success btn-sm mx-1" onClick={() => agregar(producto, cant)}>Agregar</button>
            ) : (
            <button className="btn btn-warning btn-sm mx-1" onClick={() => agregar(producto, cant)}>Actualizar</button>
            )}
                </div>
        </div>
            </div>
        </div>
        <Detalle show={show} handleClose={handleClose} producto={producto}  />
    </>  
  )
}

export default Card