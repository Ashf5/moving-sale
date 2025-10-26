
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Homepage from "./pages/Homepage";
import LoginPage from "./pages/Loginpage";
import { AuthProvider } from "./context/authContext";
import SalePage from "./pages/salepage";


function App() {

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Header message="Active Sales" />
          <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path="/sell" element={<SalePage />} />
          </Routes>
          <Navbar />
        </AuthProvider>
      </BrowserRouter>


    </>
  )
}

export default App
