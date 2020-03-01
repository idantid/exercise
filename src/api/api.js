import axios from "axios";
import * as consts from "../constants";

export async function getLocations(location) {
  try {
    const response = await axios.get(
      `${consts.BASE_URL}Locations?locality=${location}&maxResults=10&key=${consts.BING_MAPS_KEY}`
    );
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
}
