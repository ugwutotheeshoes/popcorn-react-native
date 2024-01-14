import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  Button,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ScrollView } from "react-native-gesture-handler";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import TrendingMovies from "../components/TrendingMovies";
import MovieList from "../components/MovieList";
import { width, height, ios } from "../constants/dimension";
import { useNavigation } from "@react-navigation/native";
import { fetchTopRated, fetchUpcoming, fetchTrending } from "../hook/useFetch";

// import { TrendingMovies } from "../components/TrendingMovies.js";
// import {
//     Bars3CenterLeftIcon,
//     MagnifyingGlassIcon,
//   } from "react-native-heroicons";

export default function HomeScreen() {
  const { data: upcomingData, error, isError } = fetchUpcoming();
  // const  {isLoading ? (
  const isLoading = true;
  const { data: topRatedData } = fetchTopRated();
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const navigation = useNavigation();
  // console.log(upcoming);
  useEffect(() => {
    if (upcomingData) {
      setUpcoming(upcomingData.results);
    }
    // console.log('these are the upcoming movies', up);
    console.log(isError, error, isLoading);
    if (topRatedData) setTopRated(topRatedData.results);
    // console.log('these are the top rated movies', top);
  }, [upcomingData]);

  return (
    //   <NavigationContainer>
    <GestureHandlerRootView
      style={{
        flex: 1,
        backgroundColor: "#1e2b37",
        // justfyContent: "center",
        // alignItems: "center",
      }}
    >
      {/* <View className="flex-1 items-center justify-center bg-neutral-800"> */}
      <SafeAreaView className={ios ? "mb-1" : "mb-3"}>
        <StatusBar style="light" />
        <View className="flex-row justify-between items-center mx-4">
          {/* <Header headerText={"Hi, John "} headerIcon={"user"} /> */}
          {/* <Bars3CenterLeftIcon size="30" strokeWidth={2} color="white" /> */}
          {/* <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <Entypo
              name="magnifying-glass"
              size={32}
              strokeWidth={2}
              color="white"
            />
          </TouchableOpacity> */}
          {/* Add image for logo here */}
          <View className="flex-row items-center">
            <Image
              source={require("../../assets/pop.png")}
              style={{ height: 40, width: 40, tintColor: "#fff" }}
            />
            <Text className="flex-row text-white font-bold text-2xl">
              Popcorn
            </Text>
          </View>
          <TouchableOpacity
            className="flex-row"
            onPress={() => {
              navigation.navigate("Cart");
            }}
          >
            <Entypo
              name="shopping-cart"
              size={32}
              strokeWidth={2}
              color="white"
            />
            {/* <Text className="absolute right-2 text-white text-2xl font-semibold ml-1">
              {cart.length}
            </Text> */}
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 10 }}
      >
        {isLoading ? (
          <View>
            <TrendingMovies />
            <MovieList title="Upcoming" data={upcoming} />
            <MovieList title="Top Rated" data={topRated} />
          </View>
        ) : (
          <Text className="text-white text-2xl font-bold text-center">
            Loading...
          </Text>
        )}
      </ScrollView>
    </GestureHandlerRootView>
  );
}
