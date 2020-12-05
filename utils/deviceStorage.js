import AsyncStorage from "@react-native-async-storage/async-storage";

export const deviceStorage = {
  save: async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.log(error);
    }
  },
  read: async (key) => {
    try {
      return await AsyncStorage.getItem(key);
    } catch (error) {
      console.log(error);
    }
  },
  remove: async (key) => {
    try {
      return await AsyncStorage.removeItem(key);
    } catch (error) {
      console.log(error);
    }
  },
};
