import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import HomePage from "./components/home";
import CharacterList from "./components/characters/character_form/CharacterList";
import CharacterForm from "./components/characters/character_form/CharacterForm";
import CharacterGeneratePDF from "./components/characters/generatePDF/CharacterGeneratePDF";

import CovenantList from "./components/covenants/CovenantList";
import CovenantForm from "./components/covenants/CovenantForm";
import SoloHome from "./components/play_tools/SoloHome";
import PageNotFound from "./components/utility/PageNotFound";

// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='*' element={<PageNotFound />} />
        <Route exact path="/" element={<HomePage />} />
        <Route path="/characters/*" element={<CharacterRoutes />} />
        <Route path="/covenants/*" element={<CovenantRoutes />} />
        <Route path="/tools/solo" element={<SoloHome />} />
      </Routes>
    </div>
  );
};

const CharacterRoutes = () => {
  return (
    <Routes>
      <Route path='*' element={<PageNotFound />} />
      <Route path="/" element={<CharacterList />} />
      <Route path="/edit/:id" element={<CharacterForm queryType="edit" />} />
      <Route path="/create" element={<CharacterForm queryType="add" />} />
      <Route path="/generatePDF/:id" element={<CharacterGeneratePDF />} />
    </Routes>
  );
};

const CovenantRoutes = () => {
  return (
    <Routes>
      <Route path='*' element={<PageNotFound />} />
      <Route path="/" element={<CovenantList />} />
      <Route path="/edit/:id" element={<CovenantForm queryType="edit" />} />
      <Route path="/create" element={<CovenantForm queryType="add" />} />
    </Routes>
  );
};

export default App;
