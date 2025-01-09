import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";

interface CustomInputProps {
  label: string;
  labelStyle: string;
  value: string;
  containerStyle: string;
  secureTextEntry: boolean;
  inputStyle: string;
  onChangeText: () => void
}

const CustomInput= ({ label, labelStyle, value, containerStyle, inputStyle, onChangeText, secureTextEntry, ...props }) => {
  const [ showPassword, setShowPassword ] = useState(false)
  return (
    <KeyboardAvoidingView className="my-2">
      <TouchableWithoutFeedback>
        <View>
          <Text className={` font-pregular capitalize ${labelStyle}`}>{label}</Text>
          <View className={`flex flex-row justify-start items-center relative bg-neutral-100 rounded-lg border border-gray-200 focus:border-primary-500  ${containerStyle}`}>
            <TextInput onChangeText={onChangeText} className={`rounded-lg p-4 font-pregular text-[15px] flex-1 ${inputStyle} text-left`}
              secureTextEntry={(label === "password" || label === "confirm password") && !showPassword}
              {...props} />
              {
                (label === "password" || label ==="confirm password") && (
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <FontAwesome name={!showPassword ? 'eye' : 'eye-slash'} size={24} />
                </TouchableOpacity>)
              }
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default CustomInput;
