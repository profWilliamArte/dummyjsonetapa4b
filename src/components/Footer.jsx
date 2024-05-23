

const Footer = () => {
  return (
    <div className="container">
    <footer className="py-3 my-4">
        <ul className="nav justify-content-center border-bottom pb-3 mb-3">
        <li className="nav-item"><a href="/inicio" className="nav-link px-2 text-body-secondary">Inicio</a></li>
        <li className="nav-item"><a href="/tienda" className="nav-link px-2 text-body-secondary">Tienda</a></li>
        <li className="nav-item"><a href="/movil" className="nav-link px-2 text-body-secondary">Movil</a></li>
        <li className="nav-item"><a href="/laptop" className="nav-link px-2 text-body-secondary">Laptop</a></li>
        <li className="nav-item"><a href="/contactos" className="nav-link px-2 text-body-secondary">Contactos</a></li>
        </ul>
        <p className="text-center text-body-secondary">© 2024 AR SISTEMA, Inc</p>
    </footer>
    </div>

  )
}

export default Footer