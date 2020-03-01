import React, { useState, useEffect } from "react";
import Map from "../components/Map";
import MapForm from "../components/MapForm";
import * as consts from "../constants";
import "./MapContainer.css";

export default class MapContainer extends React.Component {
  constructor() {
    super();
    this.addPin = this.addPin.bind(this);
    this.removePin = this.removePin.bind(this);
    this.state = {
      pushPins: [],
      polyLines: {
        location: []
      }
    };
  }

  addPin(e) {
    console.log("add pin", e);
    if (e.isCoord) {
      const coords = [+e.coordX, +e.coordY];
      this.setState(prevState => ({
        pushPins: [...prevState.pushPins, { location: coords }],
        polyLines: { location: [...prevState.polyLines.location, coords] }
      }));
    }
  }

  removePin(index) {
    console.log("remove pin", index);
    this.setState(prevState => ({
      pushPins: [
        ...prevState.pushPins.slice(0, index),
        ...prevState.pushPins.slice(index + 1)
      ],
      polyLines: {
        location: [
          ...prevState.polyLines.location.slice(0, index),
          ...prevState.polyLines.location.slice(index + 1)
        ]
      }

    }));
  }

  render() {
    return (
      <>
        <div className="map-container">
          <MapForm
            addPin={this.addPin}
            removePin={this.removePin}
            pushPins={this.state.pushPins}
          ></MapForm>
          <Map
            pushPins={this.state.pushPins}
            polyLines={this.state.polyLines}
          ></Map>
        </div>
      </>
    );
  }
}
