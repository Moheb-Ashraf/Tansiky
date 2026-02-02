import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Navbar/Navbar";
import AdvancedSearch from "./Pages/AdvancedSearch/AdvancedSearch";
import Home from "./Pages/Home/Home";
import ImportantNews from "./Pages/ImportantNews/ImportantNews";
import InstituteDetails from "./Pages/InstituteDetails/InstituteDetails";
import InstitutesList from "./Pages/InstitutesList/InstitutesList";
import PageNews from "./Pages/PageNews/PageNews";
import SearchResults from "./Pages/SearchResults/SearchResults";
import TypeOfUniversities from "./Pages/TypeOfUniversities/TypeOfUniversities";
import Universities from "./Pages/Universities/Universities";
import UniversityPage from "./Pages/UniversityPage/UniversityPage";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ImportantNews" element={<ImportantNews />} />
        <Route path="/ImportantNews/PageNews" element={<PageNews />} />
        <Route path="/TypeOfUniversities" element={<TypeOfUniversities />} />
        <Route path="/Universities/:type" element={<Universities />} />
        <Route path="/university/:id" element={<UniversityPage type="university" />} />
        <Route path="/college/:uniId/:id" element={<UniversityPage type="college" />} />
        <Route path="/department/:collegeId/:id" element={<UniversityPage type="department" />} />
        <Route path="/Institutes" element={<InstitutesList />} />
        <Route path="/InstituteDetails/:id" element={<InstituteDetails />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/advanced-search" element={<AdvancedSearch/>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;