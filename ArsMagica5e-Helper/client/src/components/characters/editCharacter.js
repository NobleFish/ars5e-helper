import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { CharacterForm } from "./characterForm";


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

    // This following section will display the form that takes input from the user to update the data.
    return (
        <div>
            <h3>Update Record</h3>
            <CharacterForm queryType={"edit"} existingCharacter={form} existingID={params.id.toString()} />
        </div>
    );
}