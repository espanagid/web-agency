import { Routes, Route } from 'react-router'
import Home from './pages/Home'
import Login from "./pages/Login"
import Admin from "./pages/Admin"
import NotFound from "./pages/NotFound"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/aviso-legal" element={<Legal doc="aviso" />} />
      <Route path="/privacidad" element={<Legal doc="privacidad" />} />
      <Route path="/cookies" element={<Legal doc="cookies" />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
