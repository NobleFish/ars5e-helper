import React from "react";
import { CharacterForm } from "./characterForm";

export default function CreateCharacter() {
    
    // This following section will display the form that takes the input from the user.
    return (
        <div>
            <h3>Create New Character</h3>
            <CharacterForm queryType={"add"} existingCharacter={{}} existingID={""}/>
        </div>
    );
}