import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Dimensions,
  Image,
} from "react-native";
import { width, height, image500 } from "../constants/dimension";
import Carousel from "react-native-snap-carousel";
import { useNavigation } from "@react-navigation/native";
import { fetchTrending } from "../hook/useFetch";

// var { width, height } = Dimensions.get("window");
const TrendingMovies = () => {
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(false);
  // console.log(isLoading);
  // workss, just recreate in other places
  const navigation = useNavigation();
  const handleClick = (item) => {
    navigation.navigate("Movie", item);
  };
  //   useEffect(() => {

  //     getTrendingMovies()

  //   }, [])
  //  const getTrendingMovies = async()=>{

  const { isLoading, data, error } = fetchTrending();
  //  if (data && data.results) {
  //      setTrending(data.results);
  // console.log(isLoading);
  //  }
  // }

  return (
    <View>
      <Text className="text-white text-xl mx-4 mb-5">Trending Movies</Text>
      {isLoading ? (
        <Text>Loading ...</Text>
      ) : (
        <Carousel
          data={data.results}
          renderItem={({ item }) => (
            <MovieCard item={item} handleClick={handleClick} />
          )}
          firstItem={1}
          inactiveSlideOpacity={0.6}
          sliderWidth={width}
          itemWidth={width * 0.62}
          slideStyle={{ display: "flex", alignItems: "center" }}
        />
      )}
    </View>
  );
};

export default TrendingMovies;

const MovieCard = ({ item, handleClick }) => {
  return (
    <TouchableWithoutFeedback onPress={() => handleClick(item)}>
      {/* <Text className="text-white">Movie</Text> */}
      <Image
        source={{ uri: image500(item.poster_path) }}
        // source={require("../../assets/Shameless.jpg")}
        style={{
          width: width * 0.6,
          height: height * 0.4,
        }}
        className="rounded-3xl"
      />
    </TouchableWithoutFeedback>
  );
};
