import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_SERVER_URL+process.env.REACT_APP_SERVER_PORT;

// This is a base Character to populate when mapped
const Character = (props) => (
    <tr>
        <td>{props.character.character_name}</td>
        <td>{props.character.character_type}</td>
        <td>
            <Link className="btn btn-link" to={`/editCharacter/${props.character._id}`}>Edit</Link> |
            <button className="btn btn-link" onClick={() => {props.deleteRecord(props.character._id);}}>
                Delete
            </button>
        </td>
    </tr>
);

export default function CharacterList() {
const [characters, setCharacters] = useState([]);

// This method fetches the characters from the server. Runs only once per page load.
// The second parameter (characters.length) indicates the value change that would cause this effect to be reran.
useEffect(() => {

    async function getCharacters() {
        // Request character array response from server
        const response = await fetch(`${BASE_URL}/character/`);

        // If error occurs, alert
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.alert(message);
            return;
        }

        // Resolve response.json
        const characterArray = await response.json();

        // Sets the characters state array with fetched characterArray
        setCharacters(characterArray);
    }

    // Runs the above function
    getCharacters();

    return;

}, [characters.length]);

// This method will delete a character
async function deleteCharacter(id) {
    
    // Tells the server to delete the character by id
    await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE"
    });

    // Filters out the deleted character by id
    const newCharacters = characters.filter((chara) => chara._id !== id);

    // Sets the characters state array to the filtered array
    setCharacters(newCharacters);
}

// This method will map out the characters on the table
function characterList() {
    return characters.map((character) => {
        return (
            // Passes each character value into the above character template
            <Character
                character={character}
                deleteCharacter={() => deleteCharacter(character._id)}
                key={character._id}
            />
        );
    });
}

// This following section is the HTML that is returned as part of the component.
return (
    <div>
        <h3>Character List</h3>
        <table className="table table-striped" style={{ marginTop: 20 }}>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>{characterList()}</tbody>
        </table>
    </div>
    );
}