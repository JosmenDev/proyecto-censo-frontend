import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import { Login } from "./pages/Autenticacion/Login";
import ConfirmarCuenta from "./pages/Autenticacion/ConfirmarCuenta";
import { AuthProvider } from "./context/AuthProvider";
import RutaProtegida from "./layout/RutaProtegida";
import Inicio from "./pages/admin/Inicio";
function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Rutas publicas */}
          <Route path="/" element={<AuthLayout/>}>
            <Route index element={<Login/>}/>
            <Route path="confirmar/:token" element={<ConfirmarCuenta/>}/>
          </Route>
          {/* Rutas privadas */}
          <Route path="/admin" element={<RutaProtegida/>}>
            <Route index element={<Inicio/>}/>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
