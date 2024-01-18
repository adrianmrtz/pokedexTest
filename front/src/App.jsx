import { Crud } from "./components/Crud"
import { Navbar } from "./components/Navbar"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { EditPokemon } from "./components/EditPokemon"
import './app.css'
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { Pokedex } from "./components/Pokedex"

function App() {

  return (
    <>
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/crud" />}/>

          <Route path="/crud" element={<Crud />}/>

          <Route path="/crud/edit/:pokemonId" element={<EditPokemon />}/>

          <Route path="/pokedex" element={<Pokedex />} />

          <Route path="*" element={<h1 className="my-5 text-center">404 not found</h1>}/>
        </Routes>
        
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
