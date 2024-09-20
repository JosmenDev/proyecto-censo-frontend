import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import { Login } from "./pages/Autenticacion/Login";
import ConfirmarCuenta from "./pages/Autenticacion/ConfirmarCuenta";
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthLayout/>}>
          <Route index element={<Login/>}/>
          <Route path="confirmar/:id" element={<ConfirmarCuenta/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
