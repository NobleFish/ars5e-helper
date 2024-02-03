import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Define the base URL for the server
const BASE_URL = process.env.REACT_APP_SERVER_URL + process.env.REACT_APP_SERVER_PORT;

// Character component representing each row in the table
const Character = (props) => (
  <tr>
    <td>{props.character.character_name}</td>
    <td>{props.character.character_type}</td>
    <td>
      {/* Edit link */}
      <Link className="btn btn-link" to={`edit/${props.character._id}`}>
        Edit
      </Link>{" "}
      |{" "}
      {/* Delete button */}
      <button className="btn btn-link" onClick={() => props.deleteCharacter(props.character._id)}>
        Delete
      </button>{" "}
      | 
      {/* Generate PDF link */}
      <Link className="btn btn-link" to={`generatePDF/${props.character._id}`}>
        Generate PDF
      </Link>
    </td>
  </tr>
);

// CharacterList component
const CharacterList = () => {
  // State to manage the characters data
  const [characters, setCharacters] = useState([]);
  // State to handle loading state during data fetching
  const [loading, setLoading] = useState(false);
  // State to handle and display error messages
  const [error, setError] = useState(null);

  // useEffect to fetch characters data on page load
  useEffect(() => {
    // Function to fetch characters from the server
    const getCharacters = async () => {
      try {
        setLoading(true);

        // Request characters array response from the server
        const response = await fetch(`${BASE_URL}/character/`);

        // If the server response is not OK, throw an error
        if (!response.ok) {
          throw new Error(`An error occurred: ${response.statusText}`);
        }

        // Resolve response.json
        const characterArray = await response.json();

        // Set the characters state array with fetched characterArray
        setCharacters(characterArray);
      } catch (error) {
        // Set the error state with the error message
        setError(error.message);
      } finally {
        // Set loading to false after data fetching is complete
        setLoading(false);
      }
    };

    // Call the getCharacters function
    getCharacters();
  }, []);

  // Function to delete a character
  const deleteCharacter = async (id) => {
    try {
      // Tell the server to delete the character by id
      await fetch(`${BASE_URL}/character/${id}`, {
        method: "DELETE",
      });

      // Filter out the deleted character by id
      const newCharacters = characters.filter((chara) => chara._id !== id);

      // Set the characters state array to the filtered array
      setCharacters(newCharacters);
    } catch (error) {
      // Set the error state with the error message
      setError(`Error deleting character: ${error.message}`);
    }
  };

  // Function to map out the characters into the table
  const characterList = () => {
    return characters.map((character) => (
      // Pass each character value into the Character component
      <Character
        character={character}
        deleteCharacter={() => deleteCharacter(character._id)}
        key={character._id}
      />
    ));
  };

  // Render the component
  return (
    <div>
      {/* Header */}
      <h3>Character List</h3>
      {/* Add Character link */}
      <Link className="btn btn-link" to={`create/`}>
        Add Character
      </Link>
      {/* Loading indicator */}
      {loading && <p>Loading...</p>}
      {/* Error message display */}
      {error && <p>Error: {error}</p>}
      {/* Table displaying character data */}
      <table className="table table-striped" style={{ marginTop: 20 }}>
        {/* Table header */}
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Action</th>
          </tr>
        </thead>
        {/* Table body with character data */}
        <tbody>{characterList()}</tbody>
      </table>
    </div>
  );
};

// Export the component as the default export
export default CharacterList;
