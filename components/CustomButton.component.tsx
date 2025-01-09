import { View, Text, TouchableOpacity, Image } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import React from "react";

interface CustomButtonProps {
    onPress: () => void;
    isOnboarding: boolean;
    label: string;
    isPrimary: boolean
}

const CustomButton: React.FC<CustomButtonProps> = ({ onPress, isOnboarding=false, label, isPrimary=true }) => {
  return (
    <TouchableOpacity
      className={`flex flex-row gap-3 items-center justify-center rounded-lg py-3 px-6 my-4 ${(isPrimary) ? 'bg-primary': 'bg-white'}`}
      onPress={onPress}
    >
      {isOnboarding && <FontAwesome name="envelope" size={16} style={{ color: "#fff" }} />}
      <Text className={`font-pregular text-base capitalize ${(isPrimary) ? 'text-white': 'text-gray-600'}`}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
