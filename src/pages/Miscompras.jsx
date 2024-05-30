import  { useEffect, useState } from "react";
import {  useNavigate } from 'react-router-dom';
import Compras from 'react-data-table-component';

const API = 'https://dummyjson.com/carts?limit=100';
const APIUsuario = 'http://dummyjson.com/users/1';

const Miscompras = () => {
  const [datos, setDatos] = useState([]);

  const [columns, setColumns] = useState([]);

  const getDatos = async () => {
    try {
      const response = await fetch(API);
      const data = await response.json();
      //console.log(data);
      setDatos(data.carts);
 

      // Obtener el nombre de cada userId
      const nombresUsuarios = await Promise.all(
        data.carts.map(async (cart) => {
          const usuarioResponse = await fetch(`http://dummyjson.com/users/${cart.userId}`);
          const usuarioData = await usuarioResponse.json();
          return usuarioData.company.name;
        })
      );


      // Actualizar las columnas del DataTable
      const updatedColumns = [
        {
          name: "ID",
          selector: (row) => row.id,
        },
        {
          name: "Usuario",
          selector: (row) => row.userId,
        },
        {
          name: "Nombre",
          selector: (row) => {
            const usuarioIndex = data.carts.findIndex((cart) => cart.userId === row.userId);
            return nombresUsuarios[usuarioIndex];
          },
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
        
     

      setDatos(data.carts);
      setColumns(updatedColumns);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDatos();
  }, []);
  const navigate = useNavigate();

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
            columns={columns}
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

export default Miscompras;
