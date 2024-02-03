import React from "react";

// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
 
// We import all the components we need in our app
import Navbar from "./components/navbar";

import HomePage from "./components/home";

import CharacterList from "./components/characters/character_form/listCharacters";
import {CharacterForm} from "./components/characters/character_form/characterForm";

import CovenantList from "./components/covenants/listCovenants";
import {CovenantForm} from "./components/covenants/covenantForm";

import { PrintCharacter } from "./components/characters/print/printCharacter";

import { SoloHome } from "./components/play_tools/solo_home";

import { NotFound } from "./components/utility/PageNotFound";

const App = () => {
 return (
   <div>
     <Navbar />
     <Routes>
       <Route path='*' element={<NotFound />} />
       <Route exact path="/" element={<HomePage />} />
       <Route path="/characters" element={<CharacterList />}/>
       <Route path="/editCharacter/:id" element={<CharacterForm queryType={"edit"} />} />
       <Route path="/createCharacter" element={<CharacterForm queryType={"add"} />} />
       <Route path="/covenants" element={<CovenantList />}/>
       <Route path="/editCovenant/:id" element={<CovenantForm queryType={"edit"} />} />
       <Route path="/createCovenant" element={<CovenantForm queryType={"add"} />} />
       <Route path="/print/character/:id" element={<PrintCharacter />} />
       <Route path="/tools/solo" element={<SoloHome />} /> 
     </Routes>
   </div>
 );
};
 
export default App;