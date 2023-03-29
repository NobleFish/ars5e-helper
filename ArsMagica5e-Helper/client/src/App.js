import React from "react";
 
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
 
// We import all the components we need in our app
import Navbar from "./components/navbar";
import CharacterList from "./components/characters/listCharacters";
import EditCharacter from "./components/characters/editCharacter";
import CreateCharacter from "./components/characters/createCharacter";

const App = () => {
 return (
   <div>
     <Navbar />
     <Routes>
       <Route exact path="/" element={<CharacterList />} />
       <Route path="/editCharacter/:id" element={<EditCharacter />} />
       <Route path="/createCharacter" element={<CreateCharacter />} />
     </Routes>
   </div>
 );
};
 
export default App;