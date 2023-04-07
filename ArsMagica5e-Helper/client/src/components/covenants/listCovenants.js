import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_SERVER_URL+process.env.REACT_APP_SERVER_PORT;

// This is a base Covenant to populate when mapped
const Covenant = (props) => (
    <tr>
        <td>{props.covenant.covenant_name}</td>
        <td>{props.covenant.covenant_type}</td>
        <td>
            <Link className="btn btn-link" to={`/editCovenant/${props.covenant._id}`}>Edit</Link> |
            <button className="btn btn-link" onClick={() => {props.deleteCovenant(props.covenant._id);}}>
                Delete
            </button>
        </td>
    </tr>
);

export default function CovenantList() {
const [covenants, setCovenants] = useState([]);

// This method fetches the covenants from the server. Runs only once per page load.
// The second parameter (covenants.length) indicates the value change that would cause this effect to be reran.
useEffect(() => {

    async function getCovenants() {
        // Request covenant array response from server
        const response = await fetch(`${BASE_URL}/covenant/`);

        // If error occurs, alert
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.alert(message);
            return;
        }

        // Resolve response.json
        const covenantArray = await response.json();

        // Sets the covenants state array with fetched covenantArray
        setCovenants(covenantArray);
    }

    // Runs the above function
    getCovenants();

    return;

}, [covenants.length]);

// This method will delete a covenant
async function deleteCovenant(id) {

    // Tells the server to delete the covenant by id
    await fetch(`${BASE_URL}/covenant/${id}`, {
        method: "DELETE"
    });

    // Filters out the deleted covenant by id
    const newCovenants = covenants.filter((coven) => coven._id !== id);

    // Sets the covenants state array to the filtered array
    setCovenants(newCovenants);
}

// This method will map out the covenants on the table
function covenantList() {
    return covenants.map((covenant) => {
        return (
            // Passes each covenant value into the above covenant template
            <Covenant
                covenant={covenant}
                deleteCovenant={() => deleteCovenant(covenant._id)}
                key={covenant._id}
            />
        );
    });
}

// This following section is the HTML that is returned as part of the component.
return (
    <div>
        <h3>Covenant List</h3>
        <Link className="btn btn-link" to={`/createCovenant/`}>Add Covenant</Link>
        <table className="table table-striped" style={{ marginTop: 20 }}>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>{covenantList()}</tbody>
        </table>
    </div>
    );
}