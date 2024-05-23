import { useContext } from "react";
import { carritoContext } from "../contexts/carritoContext";

const Vercompra = () => {
    const { cart, eliminar, vaciar, comprar, validado } = useContext(carritoContext)
  return (
    <div className="container">

    <h3 className="text-center text-black-50 py-3">Lista de Compra</h3>
    <div className="card">
      <table className="table table-striped table-bordered tabke-hover table-info">
    <thead className="table-dark text-center">
      <tr>
        <th scope="col">#</th>
        <th scope="col">ID</th>
        <th scope="col">Nombre</th>
        <th scope="col">Precio</th>
        <th scope="col">% Desc. </th>
        <th scope="col">Precio Final</th>
        <th scope="col">Cantidad</th>
        <th scope="col">Total</th>
        <th scope="col">Eliminar</th>
      </tr>
    </thead>
    <tbody>
      {cart &&
        cart.map((item, index) => {
          const precioFinal = item.price - (item.price * (item.discountPercentage / 100));
          const totalItem = precioFinal * item.cantidad;
          return (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td className="text-center">{item.id}</td>
              <td className="text-start">{item.title}</td>
              <td className="text-end">{item.price.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 })}</td>
              <td className="text-end">{item.discountPercentage}%</td>
              <td className="text-end">{precioFinal.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 })}</td>
              <td className="text-center">{item.cantidad}</td>
              <td className="text-end">{totalItem.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 })}</td>
              <td className="text-center">
                <button className="btn btn-danger btn-sm" onClick={() => eliminar(item.id)}>Eliminar</button>
              </td>
            </tr>
          );
        })}
    </tbody>
    <tfoot>
      <tr>
        <td colSpan="6" className="text-end">
          <b>Total:</b>
        </td>
        <td className="text-center">
          <b>
            {cart &&
              cart.reduce((total, item) => total + parseInt(item.cantidad), 0)}
          </b>
        </td>
        <td className="text-end">
          <b>
            {cart &&
              cart.reduce((total, item) => total + (item.price - (item.price * (item.discountPercentage / 100))) * item.cantidad, 0).toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 })}
          </b>
        </td>
        <td></td>
      </tr>
    </tfoot>
      </table>
    </div>
    {cart.length > 0 ? (
      
            <div className="card p-3 my-3">

                <button className="btn btn-danger btn-sm mx-1 mb-2" onClick={() => vaciar()}>Vaciar Carrito</button>
            
                <button className="btn btn-success btn-sm mx-1" onClick={() => comprar()}>Realizar la Comprar</button>
              

            </div>
             ) : (
            <div className="card p-3 my-3">
                 <h5>Carrito Vacío</h5>
             </div>
        )}
</div>
  )
}

export default Vercompra