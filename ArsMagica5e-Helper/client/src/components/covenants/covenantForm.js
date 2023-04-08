import React, {useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router";

const BASE_URL = process.env.REACT_APP_SERVER_URL+process.env.REACT_APP_SERVER_PORT;
const NAVIGATE_TO = "/covenants";

// Query Types can be "add" or "edit", if "edit", include mongo ObjectID as string
export function CovenantForm({queryType}){

    // An empty covenant
    const BLANK_COVENANT = {
        covenant_name: "",
        covenant_type: ""
    };

    // Form state object
    const [form, setForm] = useState(BLANK_COVENANT);
    const [existingID,setExistingID] = useState("");

    const navigate = useNavigate();
    const params = useParams();
    
    useEffect(() => {
        
        if(queryType === "edit"){

            setExistingID(params.id.toString());

            // This fetches covenant data on page enter
            if(existingID === ""){
                return;
            }

            async function fetchData() {
                
                // Request covenant response from server
                const response = await fetch(`${BASE_URL}/covenant/${existingID}`);
    
                // If server does not respond
                if (!response.ok) {
                    const message = `An error has occurred: ${response.statusText}`;
                    window.alert(message);
                    return;
                }
    
                const covenant = await response.json();
                    if (!covenant) {
                        window.alert(`Covenant with id ${existingID} not found`);
                        navigate(NAVIGATE_TO);
                    return;
                }

                setForm(covenant);
            }
    
            fetchData();
            
            return;
        };
        
    },[queryType,existingID])

    // Update
    async function onSubmit(e) {
        // Prevent default submission 
        e.preventDefault();

        const newCovenant = { ...form };

        if(queryType === "add"){
            // Forming the post request with the newCovenant info
            await fetch(`${BASE_URL}/covenant/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            
                body: JSON.stringify(newCovenant),
            })
            .catch(error => {
                window.alert(error);
                return;
            });
        }

        if(queryType === "edit"){
            
            // This will send a post request to update the covenant in the database.
            await fetch(`${BASE_URL}/covenant/update/${existingID}`, {
                method: "POST",
                body: JSON.stringify(newCovenant),
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
        setForm(BLANK_COVENANT);

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
                <h3>Create New Covenant</h3>
            }
            {queryType === "edit" && 
                <h3>Update Covenant</h3>
            }
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="covenant_name">Covenant Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="covenant_name"
                        value={form.covenant_name}
                        onChange={(e) => updateForm({ covenant_name: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="covenant_type">Covenant Type</label>
                    <input
                        type="text"
                        className="form-control"
                        id="covenant_type"
                        value={form.covenant_type}
                        onChange={(e) => updateForm({ covenant_type: e.target.value })}
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


