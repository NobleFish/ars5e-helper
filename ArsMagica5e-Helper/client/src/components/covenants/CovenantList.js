import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Define the base URL for the server
const BASE_URL = process.env.REACT_APP_SERVER_URL + process.env.REACT_APP_SERVER_PORT;

// Covenant component representing each row in the table
const Covenant = (props) => (
  <tr>
    <td>{props.covenant.covenant_name}</td>
    <td>{props.covenant.covenant_type}</td>
    <td>
      {/* Edit link */}
      <Link className="btn btn-link" to={`edit/${props.covenant._id}`}>
        Edit
      </Link>{" "}
      |{" "}
      {/* Delete button */}
      <button className="btn btn-link" onClick={() => props.deleteCovenant(props.covenant._id)}>
        Delete
      </button>{" "}
      | 
      {/* Generate PDF link */}
      <Link className="btn btn-link" to={`generatePDF/${props.covenant._id}`}>
        Generate PDF
      </Link>
    </td>
  </tr>
);

// CovenantList component
const CovenantList = () => {
  // State to manage the covenants data
  const [covenants, setCovenants] = useState([]);
  // State to handle loading state during data fetching
  const [loading, setLoading] = useState(false);
  // State to handle and display error messages
  const [error, setError] = useState(null);

  // useEffect to fetch covenants data on page load
  useEffect(() => {
    // Function to fetch covenants from the server
    const getCovenants = async () => {
      try {
        setLoading(true);

        // Request covenants array response from the server
        const response = await fetch(`${BASE_URL}/covenant/`);

        // If the server response is not OK, throw an error
        if (!response.ok) {
          throw new Error(`An error occurred: ${response.statusText}`);
        }

        // Resolve response.json
        const covenantArray = await response.json();

        // Set the covenants state array with fetched covenantArray
        setCovenants(covenantArray);
      } catch (error) {
        // Set the error state with the error message
        setError(error.message);
      } finally {
        // Set loading to false after data fetching is complete
        setLoading(false);
      }
    };

    // Call the getCovenants function
    getCovenants();
  }, [covenants.length]);

  // Function to delete a covenant
  const deleteCovenant = async (id) => {
    try {
      // Tell the server to delete the covenant by id
      await fetch(`${BASE_URL}/covenant/${id}`, {
        method: "DELETE",
      });

      // Filter out the deleted covenant by id
      const newCovenants = covenants.filter((coven) => coven._id !== id);

      // Set the covenants state array to the filtered array
      setCovenants(newCovenants);
    } catch (error) {
      // Set the error state with the error message
      setError(`Error deleting covenant: ${error.message}`);
    }
  };

  // Function to map out the covenants into the table
  const covenantList = () => {
    return covenants.map((covenant) => (
      // Pass each covenant value into the Covenant component
      <Covenant
        covenant={covenant}
        deleteCovenant={() => deleteCovenant(covenant._id)}
        key={covenant._id}
      />
    ));
  };

  // Render the component
  return (
    <div>
      {/* Header */}
      <h3>Covenant List</h3>
      {/* Add Covenant link */}
      <Link className="btn btn-link" to={`create/`}>
        Add Covenant
      </Link>
      {/* Loading indicator */}
      {loading && <p>Loading...</p>}
      {/* Error message display */}
      {error && <p>Error: {error}</p>}
      {/* Table displaying covenant data */}
      <table className="table table-striped" style={{ marginTop: 20 }}>
        {/* Table header */}
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Action</th>
          </tr>
        </thead>
        {/* Table body with covenant data */}
        <tbody>{covenantList()}</tbody>
      </table>
    </div>
  );
};

// Export the component as the default export
export default CovenantList;
