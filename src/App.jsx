import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Navbar/Navbar";

import { NewsSection } from "./Components/NewsSection/NewsSection";
import Home from "./Pages/Home/Home";
import ImportantNews from "./Pages/ImportantNews/ImportantNews";
import PageNews from "./Pages/PageNews/PageNews";
import TypeOfUniversities from "./Pages/TypeOfUniversities/TypeOfUniversities";
import Universities from "./Pages/Universities/Universities";
import UniversityPage from "./Pages/UniversityPage/UniversityPage";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>

  <Route path="/" element={<Home />} />
  <Route path="/NewsSection" element={<NewsSection />} />

  <Route path="/ImportantNews" element={<ImportantNews />} />
  <Route path="/ImportantNews/PageNews" element={<PageNews />} />

  <Route path="/TypeOfUniversities" element={<TypeOfUniversities />} />
  <Route path="/UniversityPage" element={<UniversityPage />} />
  <Route path="/Universities" element={<Universities />} />

</Routes>


      <Footer />
    </Router>
  );
}

export default App;
