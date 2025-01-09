import { View, Text } from "react-native";
import React from "react";

const Alert = ({ message, color }: { message: string; color: string }) => {
  return (
    <View className={`border border-${color}-300 rounded bg-${color}-100 p-3 mb-2`}>
      <Text className={`capitalize text-base font-pregular text-${color}-700`}>{message}</Text>
    </View>
  );
};

export default Alert;
