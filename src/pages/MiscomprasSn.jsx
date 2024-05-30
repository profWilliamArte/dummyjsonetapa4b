import  { useEffect, useState } from "react";
import {  useNavigate } from 'react-router-dom';
import Compras from 'react-data-table-component';

const API = 'https://dummyjson.com/carts?limit=100';
const APIUsuario = 'http://dummyjson.com/users/1';

const MiscomprasSn = () => {
  const [datos, setDatos] = useState([]);

  const navigate = useNavigate();

  const getDatos = async () => {
    try {
      const response = await fetch(API);
      const data = await response.json();
      //console.log(data);
      setDatos(data.carts);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDatos();
  }, []);

// Actualizar las columnas del DataTable
const Columns = [
    {
      name: "ID",
      selector: (row) => row.id,
    },
    {
      name: "Usuario",
      selector: (row) => row.userId,
    },
   
    {
      name: "Productos",
      selector: (row) => row.totalProducts,
    },
    {
      name: "Cantidad",
      selector: (row) => row.totalQuantity,
    },
    {
      name: "Total",
      selector: (row) => row.total,
      sortable: true,
    },
    {
      name: "Descuento",
      selector: (row) => row.discountedTotal,
      sortable: true,
    },
    {
        name: "Acciones",
        cell: (row) => (
          <button onClick={() => handleVerDetalle(row.id)} className="btn btn-danger btn-sm">Ver Detalle</button>
        ),
      },
    ];





  const handleVerDetalle = (id) => {
      navigate('/verdetalle', {
        state: id,
      });	
  };

  const encabezadoTabla = {
    headCells: {
      style: {
        fontWeight: "bold",
        fontSize: "14px",
        backgroundColor: "#2c3e50",
        color: "#ccc",
      },
    },
  };

  const paginationComponentOptions = {
    rowsPerPageText: 'Filas por página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
  };



  return (
    <>
      <div className="container">
        <h3 className="text-center py-3 text-black-50">Listado Compras ({datos.length})</h3>
        <div className="">
        

          <Compras
            customStyles={encabezadoTabla}
            columns={Columns}
            data={datos}
            pagination
            fixedHeader
            paginationComponentOptions={paginationComponentOptions}
            highlightOnHover
            subHeader
            
          />
        </div>
      </div>
    </>
  );
};

export default MiscomprasSn;
