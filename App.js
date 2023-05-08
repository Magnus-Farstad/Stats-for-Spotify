import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import LoginScreen from "./screens/LoginScreen";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";
import HomeScreen from "./screens/HomeScreen";

export default function App() {

    const Stack = createNativeStackNavigator()

    return (
      <View style={styles.container}>
          <NavigationContainer>
              <Stack.Navigator>
                  <Stack.Screen name={"Login"}
                                component={LoginScreen}
                                options={{
                                    headerShown: false,
                                }}
                  />
                  <Stack.Screen name={"Home"}
                                component={HomeScreen}
                                options={{
                                    headerShown: false
                                }}
                  />
              </Stack.Navigator>
          </NavigationContainer>
          <StatusBar style="auto" />
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
