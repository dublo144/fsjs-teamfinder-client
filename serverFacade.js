import { SERVER_URL } from "./settings";

ServerFacade = () => {
  async function fetchGameArea() {
    const res = await fetch(`${SERVER_URL}/geoapi/gamearea`);
    const json = await res.json();
    return json.coordinates;
  }

  async function isUserInArea(lon, lat) {
    const res = await fetch(`${SERVER_URL}/geoapi/isuserinarea/${lon}/${lat}`);
    return await res.json();
  }

  return {
    fetchGameArea,
    isUserInArea,
  };
};

export default ServerFacade();
