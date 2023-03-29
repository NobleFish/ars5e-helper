import React, { useState } from "react";
import { useNavigate } from "react-router";

const BASE_URL = process.env.REACT_APP_SERVER_URL+process.env.REACT_APP_SERVER_PORT;

export default function CreateCharacter() {
    
    // An empty character, do not modify
    const BLANK_CHARACTER = {
        character_name: "",
        character_type: ""
    }

    // Form state object
    const [form, setForm] = useState(BLANK_CHARACTER);

    const navigate = useNavigate();

    // These methods will update the state properties.
    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    // This function will handle the submission.
    async function onSubmit(e) {
        // Prevent typical submit functionality
        e.preventDefault();

        // When a post request is sent to the add character url, the server adds it to the database
        const newCharacter = { ...form };

        // Forming the post request with the newCharacter info
        await fetch(`${BASE_URL}/character/add`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
        
            body: JSON.stringify(newCharacter),
        })
        .catch(error => {
            window.alert(error);
            return;
        });

        // Clears form data
        setForm(BLANK_CHARACTER);

        // Navigates back to home page
        navigate("/");
    }

    // This following section will display the form that takes the input from the user.
    return (
        <div>
            <h3>Create New Record</h3>
            <form onSubmit={onSubmit}>
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
                <div className="form-group">
                    <input type="submit" value="Create person" className="btn btn-primary"/>
                </div>
            </form>
        </div>
    );
}