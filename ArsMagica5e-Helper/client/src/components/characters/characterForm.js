import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router";

const BASE_URL = process.env.REACT_APP_SERVER_URL+process.env.REACT_APP_SERVER_PORT;
const NAVIGATE_TO = "/";

export function CharacterForm({queryType, existingCharacter, existingID}){

    // An empty character
    const BLANK_CHARACTER = {
        character_name: "",
        character_type: ""
    };

    // Form state object
    const [form, setForm] = useState(BLANK_CHARACTER);
    const [qType,setQType] = useState(queryType);
    const [charID,setCharID] = useState(existingID);

    const navigate = useNavigate();

    useEffect(() => {
        if(qType === "edit"){
            setForm(existingCharacter);
        };
        console.log(form);
    },)

    // Update
    async function onSubmit(e) {
        // Prevent default submission 
        e.preventDefault();

        const newCharacter = { ...form };

        console.log(newCharacter);
    

        if(qType === "add"){
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
        }

        if(qType === "edit"){
            // This will send a post request to update the character in the database.
            await fetch(`${BASE_URL}/character/update/${charID}`, {
                method: "POST",
                body: JSON.stringify(newCharacter),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .catch(error => {
                window.alert(error);
                return;
            }); 
        }
        
        // Clears form data
        setForm(BLANK_CHARACTER);

        // Navigate to main page
        navigate(NAVIGATE_TO);
    }

    // These methods will update the state properties.
    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    return(
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
    )


}


