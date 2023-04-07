import React, {useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router";

const BASE_URL = process.env.REACT_APP_SERVER_URL+process.env.REACT_APP_SERVER_PORT;
const NAVIGATE_TO = "/";

// Query Types can be "add" or "edit", if "edit", include mongo ObjectID as string
export function CharacterForm({queryType, eXxistingID}){

    // An empty character
    const BLANK_CHARACTER = {
        character_name: "",
        character_type: ""
    };

    // Form state object
    const [form, setForm] = useState(BLANK_CHARACTER);
    const [existingID,setExistingID] = useState("");

    const navigate = useNavigate();
    const params = useParams();
    
    useEffect(() => {
        
        if(queryType === "edit"){

            setExistingID(params.id.toString());

            // This fetches character data on page enter
            if(existingID === ""){
                return;
            }

            async function fetchData() {
                
                // Request character response from server
                const response = await fetch(`${BASE_URL}/character/${existingID}`);
    
                // If server does not respond
                if (!response.ok) {
                    const message = `An error has occurred: ${response.statusText}`;
                    window.alert(message);
                    return;
                }
    
                const character = await response.json();
                    if (!character) {
                        window.alert(`Character with id ${existingID} not found`);
                        navigate(NAVIGATE_TO);
                    return;
                }

                setForm(character);
            }
    
            fetchData();
            
            return;
        };
        
    },[queryType,existingID])

    // Update
    async function onSubmit(e) {
        // Prevent default submission 
        e.preventDefault();

        const newCharacter = { ...form };

        if(queryType === "add"){
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

        if(queryType === "edit"){
            
            // This will send a post request to update the character in the database.
            await fetch(`${BASE_URL}/character/update/${existingID}`, {
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
        <div>
            {queryType === "add" && 
                <h3>Create New Character</h3>
            }
            {queryType === "edit" && 
                <h3>Update Character</h3>
            }
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
                    {queryType === "add" && 
                        <input type="submit" value="Create person" className="btn btn-primary"/> 
                    }
                    {queryType === "edit" && 
                        <input type="submit" value="Edit person" className="btn btn-primary"/> 
                    }
                </div>
            </form>
        </div>
    )


}


