import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  Dimensions,
} from "react-native";
import React from "react";
import { styles } from "../styles/themes";
import { useNavigation } from "@react-navigation/native";
import { width, height, image342 } from "../constants/dimension";

// var { width, height } = Dimensions.get("window");

const MovieList = ({ title, data, hideSeeAll }) => {
  // const data=[1,2,3,4,5]
  // let movieTitle = item.title;
  const navigation = useNavigation();

  return (
    <View className="mb-8 space-y-4">
      <View className="mx-4 flex-row justify-between items-center">
        <Text className="text-white text-xl">{title}</Text>
        {/* {!hideSeeAll && (
          <TouchableOpacity>
            <Text style={styles.text} className="text-lg">
              See All
            </Text>
          </TouchableOpacity>
        )} */}
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {data.map((item, index) => {
          const movieLength = item.title;
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => navigation.push("Movie", item)}
            >
              <View className="space-y-1 mr-4">
                <Image
                  // source={require("../../assets/Supernatural.jpg")}
                  source={{ uri: image342(item.poster_path) }}
                  className="rounded-3xl"
                  style={{
                    width: width * 0.33,
                    height: height * 0.22,
                  }}
                />
                <Text className="text-neutral-300 ml-1">
                  {item.title.length > 14
                    ? item.title.slice(0, 14) + "..."
                    : item.title}
                </Text>
                {/* {item.title} */}
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default MovieList;

// const ShortenedTextComponent = ({ originalText, maxLength }) => {
//   // Check if the original text length exceeds the specified maxLength
//   console.log(originalText);
//   const isTextTooLong = originalText.length > maxLength;

//   // Shorten the text if needed

//   return (
//     // <View>
//       <Text className="text-neutral-300 ml-1">{isTextTooLong
//     ? originalText.slice(0, maxLength)+ '...'
//     : originalText}</Text>
//     // </View>
//   );
// };
