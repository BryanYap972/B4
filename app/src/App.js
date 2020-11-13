import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { API } from "@aws-amplify/api";

function App() {
  const [addUser, setAdd] = useState("");
  const [updateUser, setUpdate] = useState("");
  const [updateId, setUpdateId] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [uses, setUse] = useState([]);
  const [options, setOptions] = useState([]);
  const [boolean, setboo] = useState(true);
  const [errorMessage, setErr] = useState("");

  useEffect(() => {
    const getAll = async () => {
      try {
        const apiName = "dev";
        const path = "/users";
        const myInit = {};
        const response = await API.get(apiName, path, myInit);
        console.log(response);
        const options = response.map((person) => (
          <option value={person._id}> {person._id} </option>
        ));
        setOptions(options);
        getUsers(response);
      } catch (err) {
        console.log(err);
        setErr(err.message);
      }
    };
    getAll();
  }, [boolean]);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const apiName = "dev";
      const path = "/users";
      const myInit = {
        body: {
          username: addUser,
        },
      };
      const response = await API.post(apiName, path, myInit);
      console.log(response);
      window.location.reload();
    } catch (err) {
      console.log(err);
      setErr(err.message);
    }
  };

  const handleUpdate = async (event) => {
    try {
      event.preventDefault();
      const apiName = "dev";
      const path = "/users/" + updateId;
      const myInit = {
        body: {
          username: updateUser,
        },
      };
      const response = await API.put(apiName, path, myInit);
      console.log(response);
      window.location.reload();
    } catch (err) {
      console.log(err);
      setErr(err.message);
    }
  };

  const handleDelete = async (event) => {
    try {
      event.preventDefault();
      const apiName = "dev";
      const path = "/users/" + deleteId;
      const myInit = {};
      const response = await API.del(apiName, path, myInit);
      console.log(response);
      window.location.reload();
    } catch (err) {
      console.log(err);
      setErr(err.message);
    }
  };

  const handleSelectChangeUpdate = (event) => {
    event.preventDefault();
    setUpdateId(event.target.value);
  };

  const handleSelectChangeDelete = (event) => {
    event.preventDefault();
    setDeleteId(event.target.value);
  };

  const getUsers = (persons) => {
    if (persons) {
      const use = (
        <ul>
          {persons.map((person) => (
            <li>
              {person.username} {person._id}
            </li>
          ))}
        </ul>
      );
      setUse(use);
      console.log(uses);
    } else {
      const use = [<h1>Refresh Page</h1>];
      setUse(use);
      setboo(!boolean);
    }
  };

  return (
    <div style={{ paddingTop: "1%" }}>
      {errorMessage && <h3 className="error"> {errorMessage} </h3>}
      <h4>GET:</h4>
      <div className="container d-flex justify-content-center">{uses}</div>
      <h4>POST:</h4>
      <div
        className="container d-flex justify-content-center"
        style={{ paddingBottom: "1%" }}
      >
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={addUser}
            onChange={(event) => setAdd(event.target.value)}
            placeholder="Enter new User"
            required
           
          />

          <button type="submit" class="btn btn-primary" >
            Add!
          </button>
        </form>
      </div>
      <h4>UPDATE:</h4>
      <div
        className="container d-flex justify-content-center"
        style={{ paddingBottom: "1%" }}
      >
        Selected ID: {updateId}
      </div>
      <div
        className="container d-flex justify-content-center"
        style={{ paddingBottom: "1%" }}
      >
        <select
          name="update"
          value={updateId}
          onChange={handleSelectChangeUpdate}
        >
          <option value="">-- select an option --</option>
          {options}
        </select>
      </div>
      <div
        className="container d-flex justify-content-center"
        style={{ paddingBottom: "1%" }}
      >
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            value={updateUser}
            onChange={(event) => setUpdate(event.target.value)}
            placeholder="Enter new username"
            required
          />

          <button type="submit" class="btn btn-primary">
            Update!
          </button>
        </form>
      </div>
      <h4>DELETE:</h4>
      <div
        className="container d-flex justify-content-center"
        style={{ paddingBottom: "1%" }}
      >
        Selected ID: {deleteId}
      </div>
      <div
        className="container d-flex justify-content-center"
        style={{ paddingBottom: "1%" }}
      >
        <select
          name="delete"
          value={deleteId}
          onChange={handleSelectChangeDelete}
        >
          <option value="">-- select an option --</option>
          {options}
        </select>
        <button type="submit" class="btn btn-danger" onClick={handleDelete}>
          Delete!
        </button>
      </div>
    </div>
  );
}

export default App;
