import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";


const BASE_URL = process.env.REACT_APP_SERVER_URL+process.env.REACT_APP_SERVER_PORT;

export default function EditCharacter() {
    
    // Default values of form before character data collected
    const BLANK_CHARACTER = {
        character_name: "",
        character_type: ""
    }
    
    const [form, setForm] = useState(BLANK_CHARACTER);

    // Requirement to get value from previous page
    const params = useParams();

    // Requirement to navigate away
    const navigate = useNavigate();

    // This fetches character data on page enter
    useEffect(() => {
        async function fetchData() {
            // ID is being passed from previous page
            const id = params.id.toString();
            
            // Request character response from server
            const response = await fetch(`${BASE_URL}/character/${params.id.toString()}`);

            // If server does not respond
            if (!response.ok) {
                const message = `An error has occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const character = await response.json();
                if (!character) {
                    window.alert(`Character with id ${id} not found`);
                    navigate("/");
                return;
            }

            setForm(character);
        }

        fetchData();

        return;
    }, [params.id, navigate]);

    // These methods will update the state properties.
    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    async function onSubmit(e) {
       // Prevent default submission 
        e.preventDefault();
        
        // Creates the editedCharacter object
        const editedCharacter = {
            character_name: form.name,
            character_type: form.position
        };

        // This will send a post request to update the character in the database.
        await fetch(`${BASE_URL}/character/update/${params.id}`, {
            method: "POST",
            body: JSON.stringify(editedCharacter),
            headers: {
            'Content-Type': 'application/json'
            }
        });

        navigate("/");
    }

    // This following section will display the form that takes input from the user to update the data.
    return (
        <div>
            <h3>Update Record</h3>
            <div className="form-group">
                <label htmlFor="character_name">Character Name</label>
                <input
                    type="text"
                    className="form-control"
                    id="character_name"
                    value={form.character_name}
                    onChange={(e) => updateForm({ character_name: e.target.value })}
                />
            </div>
            <div className="form-group">
                <label htmlFor="character_type">Character Type</label>
                <input
                    type="text"
                    className="form-control"
                    id="character_type"
                    value={form.character_type}
                    onChange={(e) => updateForm({ character_type: e.target.value })}
                />
            </div>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <input type="submit" value="Update Record" className="btn btn-primary"/>
                </div>
            </form>
        </div>
    );
}