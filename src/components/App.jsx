import React, { useState } from "react";
import Nav from "./Nav";
import hogsData from "../porkers_data";

function App() {
  const [hogs, setHogs] = useState(hogsData);
  const [filterGreased, setFilterGreased] = useState(false);
  const [sortBy, setSortBy] = useState("none");
  const [formData, setFormData] = useState({
    name: "",
    weight: "",
    specialty: "",
    greased: false,
  });

  const filteredHogs = filterGreased
    ? hogs.filter((hog) => hog.greased)
    : hogs;

  const sortedHogs = [...filteredHogs].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "weight") {
      return a.weight - b.weight;
    }
    return 0;
  });

  const handleHide = (name) => {
    setHogs(hogs.filter((hog) => hog.name !== name));
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddHog = () => {
    if (formData.name && formData.weight && formData.specialty) {
      const newHog = {
        name: formData.name,
        weight: parseFloat(formData.weight),
        specialty: formData.specialty,
        greased: formData.greased,
        "highest medal achieved": "none",
        image: "",
      };
      setHogs([...hogs, newHog]);
      setFormData({ name: "", weight: "", specialty: "", greased: false });
    }
  };

  return (
    <div className="App">
      <Nav />
      <div className="ui menu">
        <div className="item">
          <input
            type="checkbox"
            id="greased-filter"
            checked={filterGreased}
            onChange={(e) => setFilterGreased(e.target.checked)}
          />
          <label htmlFor="greased-filter">Greased Pigs Only?</label>
        </div>
        <div className="item">
          <label htmlFor="sort-select">Sort by:</label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="none">None</option>
            <option value="name">Name</option>
            <option value="weight">Weight</option>
          </select>
        </div>
      </div>
      <div className="ui cards">
        {sortedHogs.map((hog) => (
          <HogTile key={hog.name} hog={hog} onHide={handleHide} />
        ))}
      </div>
      <div className="ui form">
        <div className="field">
          <label htmlFor="name-input">Name:</label>
          <input
            id="name-input"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="field">
          <label htmlFor="weight-input">Weight:</label>
          <input
            id="weight-input"
            name="weight"
            type="number"
            value={formData.weight}
            onChange={handleInputChange}
          />
        </div>
        <div className="field">
          <label htmlFor="specialty-input">Specialty:</label>
          <input
            id="specialty-input"
            name="specialty"
            value={formData.specialty}
            onChange={handleInputChange}
          />
        </div>
        <div className="field">
          <input
            type="checkbox"
            id="greased-input"
            name="greased"
            checked={formData.greased}
            onChange={handleInputChange}
          />
          <label htmlFor="greased-input">Greased?</label>
        </div>
        <button className="ui button" onClick={handleAddHog}>
          Add Hog
        </button>
      </div>
    </div>
  );
}

function HogTile({ hog, onHide }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="ui card" aria-label="hog card">
      <div className="content">
        <h3 onClick={() => setShowDetails(!showDetails)} style={{ cursor: "pointer" }}>
          {hog.name}
        </h3>
        <img
          src={hog.image}
          alt={"Photo of " + hog.name}
          style={{ maxWidth: "100%" }}
        />
        {showDetails && (
          <div className="description">
            <p>Specialty: {hog.specialty}</p>
            <p>{hog.weight}</p>
            <p>{hog.greased ? "Greased" : "Nongreased"}</p>
            <p>{hog["highest medal achieved"]}</p>
          </div>
        )}
      </div>
      <button className="ui button" onClick={() => onHide(hog.name)}>
        Hide Me
      </button>
    </div>
  );
}

export default App;