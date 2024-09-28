// Importancion de terceros
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Importacion de configuraciones
import { AuthProvider } from "./context/AuthProvider";
import roles from "./config/roles"
// Importacion de layouts
import AuthLayout from "./layout/AuthLayout";
import RutaProtegida from "./layout/RutaProtegida";
// Importacion de paginas
import { Login } from "./pages/Autenticacion/Login";
import ConfirmarCuenta from "./pages/Autenticacion/ConfirmarCuenta";
import Inicio from "./pages/Home/Inicio";
import FichaFamiliar from "./pages/FamilyRecord/FichaFamiliar";
import Personal from "./pages/User/Personal";
import Cargo from "./pages/User/Cargo";
import Usuario from "./pages/User/Usuario";
import Equipo from "./pages/User/Equipo";
import Ocupacion from "./pages/Person/Ocupacion";
import Religion from "./pages/Person/Religion";
import Parentesco from "./pages/Person/Parentesco";
import CargoComunidad from "./pages/Person/CargoComunidad";
import TipoDiscapacidad from "./pages/Person/TipoDiscapacidad";
import AccionEmergencia from "./pages/Person/AccionEmergencia";
import SeguroSalud from "./pages/Person/SeguroSalud";
import GrupoEtnico from "./pages/Person/GrupoEtnico";
import NivelEducativo from "./pages/Person/NivelEducativo";
import MedioInformacion from "./pages/Person/MedioInformacion";
import Enfermedad from "./pages/Person/Enfermedad";
import Sector from "./pages/HousingLocation/Sector";
import CentroPoblado from "./pages/HousingLocation/CentroPoblado";
import MaterialVivienda from "./pages/HoustingCharacteristics/MaterialVivienda";
import ServicioHigienico from "./pages/HoustingCharacteristics/ServicioHigienico";
import DisposicionBasura from "./pages/HoustingCharacteristics/DisposicionBasura";
import Cloracion from "./pages/HoustingCharacteristics/Cloracion";
import CombustibleCocina from "./pages/HoustingCharacteristics/CombustibleCocina";
import MedidaProteccion from "./pages/HoustingCharacteristics/MedidaProteccion";
import ReporteFicha from "./pages/Reports/ReporteFicha";
import ReporteEnfermedad from "./pages/Reports/ReporteEnfermedad";
function App() {

  
  const { ADMIN, REGISTER } = roles;

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
          {/* General */}
          {/* Inicio */}
          <Route path="/inicio" element={<RutaProtegida allowRoles={[ADMIN, REGISTER]}/>}>
            <Route index element={<Inicio/>}/>
          </Route>
          <Route element={<RutaProtegida allowRoles={[ADMIN]}/>}>
            {/* Adm. Usuarios */}
            <Route path="/adm-usuarios/personal" element={<Personal/>}/>
            <Route path="/adm-usuarios/cargo" element={<Cargo/>}/>
            <Route path="/adm-usuarios/usuario" element={<Usuario/>}/>
            <Route path="equipo" element={<Equipo/>}/>
            {/* Requerimientos */}
            {/* Req. Persona */}
            <Route path="/req-persona/ocupacion" element={<Ocupacion/>}/>
            <Route path="/req-persona/religion" element={<Religion/>}/>
            <Route path="/req-persona/parentesco" element={<Parentesco/>}/>
            <Route path="/req-persona/cargo-comunidad" element={<CargoComunidad/>}/>
            <Route path="/req-persona/tipo-discapacidad" element={<TipoDiscapacidad/>}/>
            <Route path="/req-persona/accion-emergencia" element={<AccionEmergencia/>}/>
            <Route path="/req-persona/seguro-salud" element={<SeguroSalud/>}/>
            <Route path="/req-persona/grupo-etnico" element={<GrupoEtnico/>}/>
            <Route path="/req-persona/nivel-educativo" element={<NivelEducativo/>}/>
            <Route path="/req-persona/medio-informacion" element={<MedioInformacion/>}/>
            <Route path="/req-persona/enfermedad" element={<Enfermedad/>}/>
            {/* Req. Localizacion */}
            <Route path="/req-localizacion/sector" element={<Sector/>}/>
            <Route path="/req-localizacion/centro-poblado" element={<CentroPoblado/>}/>
            {/* Req. Caracteristicas */}
            <Route path="/req-caracteristicas/material-vivienda" element={<MaterialVivienda/>}/>
            <Route path="/req-caracteristicas/servicio-higienico" element={<ServicioHigienico/>}/>
            <Route path="/req-caracteristicas/disposicion-basura" element={<DisposicionBasura/>}/>
            <Route path="/req-caracteristicas/cloracion" element={<Cloracion/>}/>
            <Route path="/req-caracteristicas/combustible-cocina" element={<CombustibleCocina/>}/>
            <Route path="/req-caracteristicas/medida-proteccion" element={<MedidaProteccion/>}/>
          </Route>
          <Route element={<RutaProtegida allowRoles={[ADMIN, REGISTER]}/>}>
            {/* Adm. Fichas Familiares */}
            <Route path="/ficha-familiar" element={<FichaFamiliar/>} />
          </Route>
          <Route element={<RutaProtegida allowRoles={[ADMIN]}/>}>
            {/* Reportes */}
            <Route path="/reporte-ficha" element={<ReporteFicha/>} />
            <Route path="/reporte-enfermedad" element={<ReporteEnfermedad/>} />
          </Route>
          
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
