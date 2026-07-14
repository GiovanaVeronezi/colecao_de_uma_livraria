import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home/Home";

import Livros from "./pages/Livros/Livros";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/livros" element={<Livros />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
