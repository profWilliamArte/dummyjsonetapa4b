import { useLocation } from "react-router-dom";
import  { useEffect, useState } from "react";
const API = 'https://dummyjson.com/carts/';
const APIUsuario = 'http://dummyjson.com/users/';
const Verdetalle = () => {
    const [datos, setDatos] = useState([]);
    const [usuario, setUsuario] = useState([]);
    const [idUsuario, setIdUsuario] = useState("");
    const location = useLocation();
    const id = location.state;

    const getDatos = async () => {
        const URI=API+id
        try {
          const response = await fetch(URI);
          const data = await response.json();
          console.log(data)
          setIdUsuario(data.userId)
          setDatos(data.products);
         console.log("este es el id"+idUsuario);


          // buscar los datos del usuario
          
        

        } catch (error) {
          console.error(error)
        }
      };
      useEffect(()=>{
        getDatos();
      },[]);  
      
      useEffect(() => {
        const fetchUserData = async () => {
          if (idUsuario) {
            try {
              const userResponse = await fetch(APIUsuario + idUsuario);
              const userData = await userResponse.json();
              setUsuario(userData);
              console.log(usuario);
            } catch (error) {
              console.error(error);
            }
          }
        };
    
        fetchUserData();
      }, [idUsuario]);
  return (
    <>
    <h3 className="text-center py-4">Cliente: {usuario.firstName} {usuario.lastName} {idUsuario}</h3>
    <div className="container">
   
      <table className="table table-striped table-bordered tabke-hover table-info">
        <thead className="table-dark text-center">
          <tr>
            <th>ID</th>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>% Desc.</th>
            <th>Total Desc.</th>
            <th>Total</th>
            <th>Total A pagar</th>
          </tr>
        </thead>
        <tbody>
          {datos && datos.map((item)=>(
            
            <tr key={item.id}>
              <td>{item.id}</td>
              <td><img src={item.thumbnail} alt="" width={50}/></td>
              <td>{item.title}</td>
              <td className="text-end">{item.price}</td>
              <td className="text-center">{item.quantity}</td>
              
              <td className="text-center">{item.discountPercentage}%</td>
              <td className="text-end">${(item.quantity*(item.price * item.discountPercentage) / 100).toFixed(2)}</td>
              <td className="text-end">{(item.price * item.quantity).toFixed(2)}</td>
              <td className="text-end">${(item.price * item.quantity - (item.price * (item.discountPercentage / 100))).toFixed(2)}</td>
            </tr>
          ))}

        </tbody>
        <tfoot className="table-dark text-center">
            <tr>
            <td colSpan="3"></td>
            <td><strong>Total:</strong></td>
            <td className="text-center">{datos.reduce((total, item) => total + (item.quantity ), 0)}</td>
            <td></td>
            <td className="text-end">${datos.reduce((total, item) => total + (item.quantity*(item.price * item.discountPercentage) / 100), 0).toFixed(2)}</td>
            <td className="text-end">${datos.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}</td>
            <td className="text-end">${datos.reduce((total, item) => total + (item.price * item.quantity - (item.price * (item.discountPercentage / 100))), 0).toFixed(2)}</td>
            </tr>
        </tfoot>
      </table>
    </div>
    </>

  )
}

export default Verdetalle