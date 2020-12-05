import React from "react";
import Home from "./components/home/Home";
import { AuthProvider } from "./contexts/AuthContext";

const SERVER_URL = "https://1bf1238a.ngrok.io";

export default App = () => {
  return (
    <AuthProvider>
      <Home />
    </AuthProvider>
  );
};
