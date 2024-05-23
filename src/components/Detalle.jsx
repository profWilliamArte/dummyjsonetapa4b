import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Detalle({show, handleClose, producto}) {

  const precioFinal = producto.price - (producto.price * (producto.discountPercentage / 100));
  return (
    <Modal show={show} onHide={handleClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Detalle del Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='row'>
            <div className='col-md-4'>
              <img src={producto.thumbnail} alt={producto.title} className="img-fluid img-thumbnail" />
            </div>
            <div className='col-md-8'>
              <h3>{producto.title}</h3>
             
              <p className="lead">
                <b>Marca: </b>{producto.brand}
                <br/><b>Categoria: </b>{producto.category}
                <br/><b>Stock: </b>{producto.stock}
                <br/><b>Clasificación: </b>{producto.rating}
                </p>
              <p className='lead small'><b>Descripción: </b>{producto.description}</p> 

              <h5 className="text-danger"><b>Precio: </b>{producto.price.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 })}$</h5>
              <h5 className="text-danger">Descuento: {producto.discountPercentage.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 })}%</h5>
              <h5 className="text-danger">Precio Final: {precioFinal.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 })}$</h5>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
    </Modal>
  );
}

export default Detalle;