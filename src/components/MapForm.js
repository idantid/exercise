import React, { useState, useEffect } from "react";
import * as consts from "../constants";
import "./MapForm.css";
import * as api from "../api/api";
import Select from "react-select";

export default function MapForm({ addPin, removePin, pushPins }) {
  const [coordX, setcordX] = useState("");
  const [coordY, setcordY] = useState("");
  const [place, setPlace] = useState("");
  const [placeOptions, setPlaceOptions] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState({});

  useEffect(() => {
    const getDataFromApi = async () => {
      if (place != "") {
        const response = await api.getLocations(place);
        if (response && response.data.resourceSets[0].resources) {
          setPlaceOptions(
            response.data.resourceSets[0].resources.map(place => ({
              value: place.point.coordinates,
              label: place.name
            }))
          );
        }
      }
    };
    getDataFromApi();
  }, [place]);

  const onChangeCordX = e => {
    setcordX(e.target.value);
  };

  const onChangeCordY = e => {
    setcordY(e.target.value);
  };

  const onChangePlace = e => {
    setPlace(e.target.value);
  };

  const submitCoords = e => {
    e.preventDefault();
    addPin({
      isCoord: true,
      coordX,
      coordY,
      place
    });
  };
  const customStyles = {
    menu: (provided, state) => ({
      ...provided,
      color: "black",
      padding: 20
    })
  };
  return (
    <div className="map-form">
      <form onSubmit={submitCoords}>
        <input
          type="text"
          name="cordX"
          value={coordX}
          onChange={onChangeCordX}
        />
        <input
          type="text"
          name="cordY"
          value={coordY}
          onChange={onChangeCordY}
        />
        <input type="text" name="plce" value={place} onChange={onChangePlace} />
        <Select
          styles={customStyles}
          value={selectedPlace}
          onChange={selected => setSelectedPlace(selected)}
          options={placeOptions}
        />
        <button>Submit Coords</button>
      </form>

      <div>
        <h5>Coordinates List</h5>
        {pushPins.map((pin, index) => {
          return (
            <div key={index} className="coords-list">
              <div>{`${pin.location[0]}, ${pin.location[1]}`}</div>
              <button onClick={() => removePin(index)}>X</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
