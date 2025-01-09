import {
  View,
  Text,
  StatusBar,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useGlobalContext } from "@/context/GlobalProvider";
import CustomModal from "@/components/CustomModal.component";

const Home = () => {
  const { user } = useGlobalContext()
  const [ isVisible, setIsVisible ] = useState<boolean>(false)
  
  const posts = [
    {
      id: 1,
      title: "translation - monday at 11:37",
      duration: "10:30",
      description: "English to Ga"
    }
  ];
  return (
    <SafeAreaView className="bg-gray-50 h-full flex-1">
      <StatusBar barStyle="dark-content" className="bg-gray-50" />
      <View className="bg-gray-50 p-4">
        <View className="flex items-end">
          <View className="bg-primary rounded-full w-12 h-12 justify-center items-center">
            <Text className="capitalize font-psemibold text-xl text-center text-white">
              {user?.firstName[0]}
            </Text>
          </View>
        </View>
        <View>
          <Text className="font-psemibold text-xl">Welcome {user?.firstName} 👋🏾</Text>
          <Text className="font-pregular text-base text-gray-500">
            Get started by pressing the button below
          </Text>
        </View>
      </View>
      <View className="p-4">
        <Text className="font-pregular text-base text-gray-500">Your Transcripts</Text>
        <TouchableOpacity className="bg-primary rounded-lg px-4 py-8 my-1" >
          <Text className="text-white font-pregular text-base ">Translation - Monday at 11:37</Text>
          <View className="flex flex-row justify-between">
            <Text className="text-white font-pregular text-base">English to Ga</Text>
            <Text className="text-white font-pregular text-base">10:30</Text>
          </View>
        </TouchableOpacity>
      </View>

      <TouchableOpacity className="absolute bottom-8 left-0 right-0 items-center" onPress={() => setIsVisible(true)}>
        <View className="bg-white rounded-full w-24 h-24 justify-center items-center shadow">
          <FontAwesome name="microphone" size={24} style={{ color: "#A01D28" }} />
        </View>
      </TouchableOpacity>
      <CustomModal isVisible={isVisible} closeModal={() => setIsVisible(false)} />
    </SafeAreaView>
  );
};

export default Home;
