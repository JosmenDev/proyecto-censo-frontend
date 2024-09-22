import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import { Login } from "./pages/Autenticacion/Login";
import ConfirmarCuenta from "./pages/Autenticacion/ConfirmarCuenta";
import { AuthProvider } from "./context/AuthProvider";
function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<AuthLayout/>}>
            <Route index element={<Login/>}/>
            <Route path="confirmar/:token" element={<ConfirmarCuenta/>}/>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
