import React, { useState, useEffect, useRef } from "react";
import { Platform, Text, View, StyleSheet, Button } from "react-native";
import Constants from "expo-constants";
import GameMap from "../mapView/GameMap";
import { useAuthState } from "../../contexts/AuthContext";
import SignIn from "../signIn/SignIn";

const Home = () => {
  return (
    <View style={{ flex: 1, paddingTop: 20 }}>
      <View style={styles.topBar}>
        <SignIn />
        <Button title={"Hello"} />
      </View>

      <GameMap />
    </View>
  );
};

const styles = StyleSheet.create({
  topBar: {
    flexDirection: "row",
    marginTop: Constants.statusBarHeight,
  },
});

export default Home;
