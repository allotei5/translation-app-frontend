import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const CurrentLanguage = ({ transcript }) => {
    const [ mainLanguage, setMainLanguage ] = useState<boolean>(true);
  return (
    <View className="flex flex-row justify-center items-center mb-5">
      <TouchableOpacity onPress={() => setMainLanguage(true)}>
        <Text className={`text-lg font-pregular ${(mainLanguage == true) ? 'text-black border-b-primary border-b-2' : 'text-gray-500'}`}>{ transcript.firstLanguage}</Text>
      </TouchableOpacity>
      <View className="mx-10">
        <TouchableOpacity onPress={() => setMainLanguage(!mainLanguage)} className={`bg-primary h-16 w-16 items-center justify-center rounded-full`}>
            <MaterialIcons size={32} name={`${(mainLanguage == true) ? 'arrow-forward' : 'arrow-back' }`} color="#fff"  />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => setMainLanguage(false)}>
        <Text className={`text-lg font-pregular ${(mainLanguage == false) ? 'text-black border-b-primary border-b-2' : 'text-gray-500'}`}>{ transcript.secondLanguage}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CurrentLanguage;
