import { View, Text, StatusBar } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import CustomTranslateInput from "@/components/CustomTranslateInput.component";
import CurrentLanguage from "@/components/CurrentLanguage.component";
import { useLocalSearchParams } from "expo-router";
import useGetTranscript from "@/hooks/useGetTranscript";
import Toast from "react-native-toast-message";

const Translate = () => {
  const {id} = useLocalSearchParams();
  console.log(id);
  const { data: transcript, isLoading, isError, error } = useGetTranscript(id);
  
  

  useEffect(() => {
    if (isLoading) {
      Toast.show({
        type: "info",
        text1: "Loading...",
      })
    }
  }, [isLoading])
  return (
    <SafeAreaView className="bg-gray-50 h-full flex-1 px-5">
      <StatusBar barStyle="dark-content" className="bg-gray-50" />
      <View className="flex flex-row justify-between">
        <MaterialIcons name="arrow-back" size={32} />
        {/* <MaterialIcons name="delete" size={32} color="#000" /> */}
      </View>
      <View className="absolute bottom-3 left-3 right-3 ">
        {transcript && <CurrentLanguage transcript={transcript} />}
        <CustomTranslateInput />
      </View>
    </SafeAreaView>
  );
};

export default Translate;
