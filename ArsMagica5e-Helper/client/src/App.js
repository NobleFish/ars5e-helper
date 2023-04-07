import React from "react";
 
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
 
// We import all the components we need in our app
import Navbar from "./components/navbar";
import CharacterList from "./components/characters/listCharacters";
import CharacterForm from "./components/characters/characterForm";

const App = () => {
 return (
   <div>
     <Navbar />
     <Routes>
       <Route exact path="/" element={<CharacterList />} />
       <Route path="/editCharacter/:id" element={<CharacterForm queryType={"edit"} />} />
       <Route path="/createCharacter" element={<CharacterForm queryType={"add"} />} />
     </Routes>
   </div>
 );
};
 
export default App;