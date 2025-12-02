import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import ImportantNews from "./Pages/ImportantNews/ImportantNews";
import PageNews from "./Pages/PageNews/PageNews";
import TypeOfUniversities from "./Pages/TypeOfUniversities/TypeOfUniversities";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/TypeOfUniversities" element={<TypeOfUniversities />} />
        <Route path="/ImportantNews" element={<ImportantNews />} />
        <Route path="/ImportantNews/PageNews" element={<PageNews />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
