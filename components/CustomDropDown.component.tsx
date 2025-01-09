import { View, Text } from "react-native";
import React, { useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import { StyleSheet } from "react-native";

const languages = [
  {
    label: "English",
    value: "en",
  },
  {
    label: "Ga",
    value: "gaa",
  },
  {
    label: "Ewe",
    value: "ee",
  },
  {
    label: "Twi",
    value: "tw",
  },
];

const CustomDropDown = ({
  label,
  languageValue,
  setLanguage,
}: {
  label: string;
  languageValue: null | string;
  setLanguage: (value: string | null) => void;
}) => {
  const [value, setValue] = useState<null | string>(null);
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View>
      <Text className="font-pregular capitalize text-base text-gray-600">
        {label}
      </Text>
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: "#4b5563" }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={languages}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "Select item" : "..."}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setValue(item.value);
          setLanguage(item.value);
          setIsFocus(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    paddingHorizontal: 10,
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderCurve: "circular",
    marginBottom: 10,
    fontSize: 14,
    color: "#4b5563",
    fontFamily: "Poppins-Regular",
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 14,
    color: "#4b5563",
    fontFamily: "Poppins-Regular",
  },
  selectedTextStyle: {
    fontSize: 14,
    color: "#4b5563",
    fontFamily: "Poppins-Regular",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default CustomDropDown;
