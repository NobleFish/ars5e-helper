import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import BLANK_CHARACTER from "../../component_data/templates.js";

// Define the base URL for the server
const BASE_URL = process.env.REACT_APP_SERVER_URL + process.env.REACT_APP_SERVER_PORT;

// Define the route to navigate to after form submission
const NAVIGATE_TO = "/characters";

// CharacterForm component
export function CharacterForm({ queryType }) {
  // State to manage the form data
  const [form, setForm] = useState(BLANK_CHARACTER);
  
  // State to manage the existing character ID when editing
  const [existingID, setExistingID] = useState("");
  
  // State to handle loading state during data fetching
  const [loading, setLoading] = useState(false);
  
  // State to handle and display error messages
  const [error, setError] = useState(null);

  // Hook to get the navigation function and route parameters
  const navigate = useNavigate();
  const params = useParams();

  // useEffect to fetch character data on page enter
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Set loading to true during data fetching
        setLoading(true);

        // Check if the queryType is "edit"
        if (queryType === "edit") {
          setExistingID(params.id.toString());

          // If no existingID is provided, exit
          if (existingID === "") {
            return;
          }

          // Fetch character data from the server
          const response = await fetch(`${BASE_URL}/character/${existingID}`);

          // If server response is not OK, throw an error
          if (!response.ok) {
            throw new Error(`An error has occurred: ${response.statusText}`);
          }

          // Parse character data from the response
          const character = await response.json();

          // If no character is found, throw an error
          if (!character) {
            throw new Error(`Character with id ${existingID} not found`);
          }

          // Set the form state with the fetched character data
          setForm(character);
        }
      } catch (error) {
        // Set the error state with the error message
        setError(error.message);
      } finally {
        // Set loading to false after data fetching is complete
        setLoading(false);
      }
    };

    // Call the fetchData function
    fetchData();
  }, [queryType, existingID, params.id, navigate]);

  // Destructure form
  const { character_name, character_type } = form;

  // Function to handle form submission
  async function onSubmit(e) {
    // Prevent default form submission behavior
    e.preventDefault();

    // Create a copy of the form data
    const newCharacter = { ...form };

    try {
      // Check if the queryType is "add"
      if (queryType === "add") {
        // Send a POST request to add a new character
        await fetch(`${BASE_URL}/character/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newCharacter),
        });

        // Additional success handling for add operation if needed
      }

      // Check if the queryType is "edit"
      if (queryType === "edit") {
        // Send a POST request to update an existing character
        await fetch(`${BASE_URL}/character/update/${existingID}`, {
          method: "POST",
          body: JSON.stringify(newCharacter),
          headers: {
            "Content-Type": "application/json",
          },
        });

        // Additional success handling for edit operation if needed
      }

      // Clear the form data after submission
      setForm(BLANK_CHARACTER);

      // Navigate to the main page
      navigate(NAVIGATE_TO);
    } catch (error) {
      // Set the error state with the error message
      setError(error.message);
    }
  }

  // Function to update the form state
  function updateForm(value) {
    setForm((prev) => ({ ...prev, ...value }));
  }

  // Render the component
  return (
    <div>
      {/* Display loading message if data is being fetched */}
      {loading && <p>Loading...</p>}

      {/* Display error message if there is an error */}
      {error && <p>Error: {error}</p>}

      {/* Render form if neither loading nor error */}
      {!loading && !error && (
        <>
          {queryType === "add" && <h3>Create New Character</h3>}
          {queryType === "edit" && <h3>Update Character</h3>}
          
          {/* Form element */}
          <form onSubmit={onSubmit}>
            {/* Input fields for character data */}
            <div className="form-group">
              <label htmlFor="character_name">Character Name</label>
              <input
                type="text"
                className="form-control"
                id="character_name"
                value={character_name}
                onChange={(e) => updateForm({ character_name: e.target.value })}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="character_type">Character Type</label>
              <input
                type="text"
                className="form-control"
                id="character_type"
                value={character_type}
                onChange={(e) => updateForm({ character_type: e.target.value })}
              />
            </div>
            
            {/* Submit button */}
            <div className="form-group">
              {queryType === "add" && (
                <input type="submit" value="Create person" className="btn btn-primary" />
              )}
              
              {queryType === "edit" && (
                <input type="submit" value="Edit person" className="btn btn-primary" />
              )}
            </div>
          </form>
        </>
      )}
    </div>
  );
}

// Export the component as the default export
export default CharacterForm;
