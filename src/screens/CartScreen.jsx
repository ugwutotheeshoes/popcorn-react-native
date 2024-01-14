import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import { FontAwesome6, Entypo, MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { addItem, clearCart, deleteItem } from "../hook/store";
import { useNavigation } from "@react-navigation/native";
import { width, height, ios, image342 } from "../constants/dimension";

export default function CartScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cartItems = useSelector((store) => store.cart.items);
  const [cart, setCart] = useState({});
  useEffect(() => {
    setCart(cartItems);
  }, [cartItems]);

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const DeleteMovie = (item) => {
    if (!item) return;
    dispatch(deleteItem(item));
  };
  //   console.log("cart title is: ", cart.title);
  return (
    <ScrollView
      className="flex-1 bg-[#1e2b37]"
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      <SafeAreaView className={ios ? "mb-2 bg-red-400" : "mb-3 bg-red-400"}>
        <View className="flex-row justify-between items-center m-4 ">
          {/* <Header headerText={"Hi, John "} headerIcon={"user"} /> */}
          {/* <Bars3CenterLeftIcon size="30" strokeWidth={2} color="white" /> */}
          {/* <View className="flex-row items-center"> */}
          <TouchableOpacity onPress={() => navigation.goBack()} className="p-1">
            <MaterialIcons
              name="chevron-left"
              size={32}
              strokeWidth={2.5}
              color="black"
            />
          </TouchableOpacity>
          {/* </View> */}
          <TouchableOpacity className="flex-row">
            <Entypo
              name="shopping-cart"
              size={32}
              strokeWidth={2}
              color="black"
            />
            <Text className="absolute right-2 text-white text-2xl font-semibold ml-1">
              {cart.length}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {cart.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          //   contentContainerStyle={{ paddingHorizontal: 15 }}
          contentContainerStyle={{ paddingBottom: 20 }}
          className="space-y-3"
        >
          {/* <Text className="text-white text-xl font-semibold ml-1">
            {cart.length} Movies
          </Text> */}
          <View className="flex-column justify-between">
            {cart.map((item, index) => {
              return (
                <View
                  key={index}
                  className="flex-row space-y-2 mb-4 px-2 py-3 justify-between border-b-2 border-neutral-600"
                >
                  <TouchableWithoutFeedback
                    onPress={() => navigation.push("Movie", item)}
                  >
                    <View className="flex-row space-x-6">
                      <Image
                        // source={require("../../assets/Supernatural.jpg")}
                        source={{ uri: image342(item.poster_path) }}
                        style={{ width: 50, height: 80 }}
                      />
                      <View className="flex-column justify-center w-60 space-y-1">
                        <Text className="text-white text-lg font-semibold">
                          {item?.title.length > 25
                            ? item?.title.slice(0, 25) + "..."
                            : item?.title}
                        </Text>
                        <View className="flex-row justify-between">
                          <Text className="text-neutral-300 uppercase tracking-wide font-semibold">
                            {item?.release_date?.split("-")[0]}
                          </Text>
                          <Text className="text-neutral-300 uppercase tracking-wide font-semibold">
                            {item?.runtime} min
                          </Text>
                        </View>
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                  <TouchableOpacity
                    onPress={() => {
                      DeleteMovie(item.id);
                    }}
                    className="absolute right-2 rounded-full p-2 m-1 bg-neutral-500"
                  >
                    {/* <Text className="text-black font-bold uppercase text-xl tracking-wider mr-2">Go back to homepage</Text> */}
                    <Entypo
                      name="cross"
                      size={22}
                      strokeWidth={2}
                      color="white"
                    />
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
          <View className="flex-row justify-between items-center mx-4">
            <TouchableOpacity
              onPress={handleClearCart}
              className="rounded-xl p-2 bg-red-400 hover:bg-red-800"
            >
              <Text className=" text-center  text-black  text-xl font-semibold tracking-wider">
                Clear Cart
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="rounded-xl p-2 bg-red-400 hover:bg-red-800">
              <Text className=" text-center text-black  text-xl font-semibold tracking-wider">
                Checkout
              </Text>
              {/* <Entypo name="plus" size={32} strokeWidth={2.5} color="white" /> */}
              {/* <Entypo name="home" size={22} strokeWidth={2} color="black" /> */}
            </TouchableOpacity>
          </View>
        </ScrollView>
      ) : (
        <View className="pt-10 flex-column justify-center items-center">
          <Image
            source={require("../../assets/cart.png")}
            className="w-96 h-96"
          />
          <Text className="font-semibold tracking-wide text-3xl text-white text-center py-4">
            Your cart is empty
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Home");
            }}
            className="flex-row justify-between items-center bg-red-400 p-2 rounded-xl mt-20"
          >
            <Text className="text-black font-bold uppercase text-xl tracking-wider mr-2">
              Go back to homepage
            </Text>
            <Entypo name="home" size={22} strokeWidth={2} color="black" />
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}
