import React from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Button,
} from "react-native";
import Constants from "expo-constants";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import { useAuthState } from "../../contexts/AuthContext";
import { backendUrl } from "../../config/settings";

const GameMap = () => {
  const [currentPostion, setCurrentPosition] = React.useState();
  const [errorMsg, setErrorMsg] = React.useState();

  const { token } = useAuthState();

  React.useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission Denied");
      }
      const currentPostion = await Location.getCurrentPositionAsync();
      setCurrentPosition({
        longitude: currentPostion.coords.longitude,
        latitude: currentPostion.coords.latitude,
      });
    })();
  }, []);

  const findNearbyPlayers = async () => {
    if (!token) {
      return <Alert>Please Log In</Alert>;
    }

    const userLocation = await Location.getCurrentPositionAsync();
    const body = {
      newPosition: {
        lat: userLocation.coords.latitude,
        lon: userLocation.coords.longitude,
      },
    };

    const config = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    };
    const res = await fetch(`${URL}/gameapi/nearbyplayers`, config);
    console.log(await res.json());
  };

  const getGameAreas = () => {};

  return (
    <View style={styles.container}>
      {currentPostion ? (
        <>
          <MapView
            style={styles.mapStyle}
            initialRegion={{
              ...currentPostion,
              latitudeDelta: 0.1022,
              longitudeDelta: 0.0421,
            }}
          >
            <MapView.Marker
              coordinate={{
                latitude: currentPostion?.latitude,
                longitude: currentPostion?.longitude,
              }}
              title="My Marker"
              description="Some description"
            />
          </MapView>
        </>
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    borderWidth: 1,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
  },
  mapStyle: {
    width: "100%",
    height: "100%",
  },
});

export default GameMap;
