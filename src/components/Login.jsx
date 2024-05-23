import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';

// para el contexto
import { useContext } from "react";
import { carritoContext } from "../contexts/carritoContext";

const Login = ({show, handleClose}) => {

  const {setValidado, setDatosUsuario, datosUsuario } = useContext(carritoContext)
  const [usuario, setUsuario] = useState('emilys');
  const [contrasenia, setContrasenia] = useState('emilyspass')
  const [datosCorrectos, setDatosCorrectos] = useState(false);


  
  function handleUsuario(event) {
    setUsuario(event.target.value);
  
  }
  function handleContrasenia(event) {
    setContrasenia(event.target.value);
  
  }
  function enviarDatos(event) {
    event.preventDefault();
    //console.log(`Usuario: ${usuario} Contraseña: ${contrasenia}`);

    fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        
        username: usuario,
        password: contrasenia,
        expiresInMins: 30, // optional, defaults to 60
      })
    })
    .then(res => res.json())
    .then(data => {
      //console.log(data)
    if (data.message!="Invalid credentials") {
      setDatosCorrectos(true);
      setValidado(true);
      setDatosUsuario(data);
     // console.log(datosUsuario)
      //console.log("Datos correctos")
    } else {
      setDatosCorrectos(false);
      setValidado(false);
      alert('Los datos ingresados no son correctos');
      //console.log('Los datos ingresados no son correctos');
    }
    })
    handleClose();
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={enviarDatos}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Usuario</Form.Label>
            <Form.Control type="text" placeholder="Indique su usuario" onChange={handleUsuario} value={usuario} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={handleContrasenia} value={contrasenia} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success"  type='submit'>
            Enviar
          </Button>
          <Button variant="secondary" onClick={handleClose} type='submit'>
            Cerrar
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default Login;

