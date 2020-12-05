import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
} from "react-native";
import {
  signIn,
  useAuthDispatch,
  useAuthState,
} from "../../contexts/AuthContext";

const SignIn = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [credentials, setCredentials] = React.useState({});

  const dispatch = useAuthDispatch();
  const { isLoggedIn } = useAuthState();

  const handleSignIn = () => {
    const { userName, password } = credentials;
    signIn(userName, password, dispatch);
    setIsVisible(false);
  };

  const handleSignOut = () => {
    dispatch({ type: "SIGN_OUT" });
  };

  return (
    <View style={styles.container}>
      <Modal animationType={"slide"} transparent={false} visible={isVisible}>
        <TextInput
          placeholder="Username"
          value={credentials?.username}
          onChangeText={(username) =>
            setCredentials({ ...credentials, userName: username })
          }
          style={styles.input}
        />

        <TextInput
          secureTextEntry={true}
          placeholder="Password"
          value={credentials?.password}
          onChangeText={(password) =>
            setCredentials({ ...credentials, password })
          }
          style={styles.input}
        />

        <Text
          style={styles.closeText}
          onPress={() => {
            handleSignIn();
          }}
        >
          Sign In
        </Text>

        <Text
          style={styles.closeText}
          onPress={() => {
            setIsVisible(false);
          }}
        >
          Cancel
        </Text>
      </Modal>

      {isLoggedIn ? (
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            handleSignOut();
          }}
        >
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setIsVisible(true);
          }}
        >
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  closeText: {
    fontSize: 24,
    color: "#00479e",
    textAlign: "center",
  },
  container: {
    padding: 10,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    display: "flex",
    height: 50,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#2AC062",
    shadowColor: "#2AC062",
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 10,
      width: 0,
    },
    shadowRadius: 25,
  },
  closeButton: {
    display: "flex",
    height: 60,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF3974",
    shadowColor: "#2AC062",
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 10,
      width: 0,
    },
    shadowRadius: 25,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 22,
  },
  text: {
    fontSize: 24,
    marginBottom: 30,
    padding: 40,
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 10,
  },
  inputext: {
    width: 200,
    height: 44,
    padding: 10,
    textAlign: "center",
    fontWeight: "bold",
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 10,
  },
});

export default SignIn;
