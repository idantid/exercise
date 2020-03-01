import React, { useState, useEffect } from "react";
import { ReactBingmaps } from "react-bingmaps";
import * as consts from "../constants";
import "./Map.css";
export default function Map({ pushPins, polyLines }) {
  return (
    <>
      <ReactBingmaps
        className="react-bingmaps"
        bingmapKey={consts.BING_MAPS_KEY}
        center={(pushPins[0] && pushPins[0].location) || [10.0827, 80.2707]}
        pushPins={pushPins}
        polyline={polyLines}
      ></ReactBingmaps>
    </>
  );
}
