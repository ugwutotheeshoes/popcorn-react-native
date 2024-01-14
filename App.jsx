import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/HomeScreen";
import MovieScreen from "./src/screens/MovieScreen";
// import PersonScreen from "./src/screens/PersonScreen";
// import SearchScreen from "./src/screens/SearchScreen";
import CartScreen from "./src/screens/CartScreen";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import store from "./src/hook/store";

// import WelcomeScreen from "./src/screen/WelcomeScreen";
// import CartScreen from "./src/screen/CartScreen";
// import SearchScreen from "./src/screen/SearchScreen";
// import Navbar from "./src/components/Navbar";

// import AppNavigation from

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

export default function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              options={{ headerShown: false }}
              component={HomeScreen}
            />
            <Stack.Screen
              name="Movie"
              options={{ headerShown: false }}
              component={MovieScreen}
            />
            {/* <Stack.Screen
              name="Person"
              options={{ headerShown: false }}
              component={PersonScreen}
            /> */}
            {/* <Stack.Screen name="Search" options={{headerShown: false}} component={SearchScreen} /> */}
            <Stack.Screen
              name="Cart"
              options={{ headerShown: false }}
              component={CartScreen}
            />
            {/* <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="Search" component={SearchScreen} /> */}
          </Stack.Navigator>
          {/* <Navbar /> */}
        </NavigationContainer>
      </QueryClientProvider>
    </Provider>
  );
}
